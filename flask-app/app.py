from flask import Flask, request, jsonify, make_response
from werkzeug.security import check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_pymongo import PyMongo, MongoClient
from flask_cors import CORS
from bson.json_util import dumps
import math
import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configure PyMongo
client = MongoClient('localhost', 27017)
db = client.finni_takehome

# Set up the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)


@app.route('/api/login', methods=['POST'])
def login():

  # Verify received providerID and password
  auth = request.get_json()
  if not auth or not auth['providerID'] or not auth['password']:
    response = {'status': 'fail', 'message': 'Missing providerID or password.'}
    return make_response(jsonify(response)), 400

  # Verify provider exists
  provider = db.providers.find_one({'providerID': auth['providerID']})
  if not provider:
    response = {'status': 'fail', 'message': 'User not found.'}
    return make_response(jsonify(response)), 404

  # Check password and return token
  if check_password_hash(provider['password'], auth['password']):
    token = create_access_token(identity=auth['providerID'],
                                expires_delta=datetime.timedelta(hours=24))
    response = {
        'status': 'success',
        'message': 'Successfully logged in.',
        'token': token
    }
    return make_response(jsonify(response)), 200

  response = {'status': 'fail', 'message': 'Incorrect password.'}
  return make_response(jsonify(response)), 404


# Get all patients, paginated, sorted, using search term
@jwt_required()
@app.route('/api/patients', methods=['GET'])
def get_patients():

  # Parse arguments
  page = int(request.args.get('page', 1))
  skip = (page - 1) * 10
  search_term = request.args.get('search', '')
  field = request.args.get('field', '')
  order = int(request.args.get('order', ''))

  # Try to convert search term to integer to faciliate searching by patientID
  try:
    search_term_number = int(search_term)
  except ValueError:
    search_term_number = search_term

  # If a search term was entered, use it to search, else do not filter
  if search_term:
    patients = db.patients.find({
        "$or": [{
            "$text": {
                "$search": search_term
            }
        }, {
            "patientID": search_term_number
        }]
    }).skip(skip).limit(10).sort(field, order)
    count = db.patients.count_documents({
        "$or": [{
            "$text": {
                "$search": search_term
            }
        }, {
            "patientID": search_term_number
        }]
    })
  else:
    patients = db.patients.find().skip(skip).limit(10).sort(field, order)
    count = db.patients.count_documents({})

  pages = math.ceil(count / 10)

  # Format patient list for response
  patients_list = []
  for patient in patients:
    del patient['_id']
    count += 1
    patients_list.append(patient)
  response_data = {'patients': patients_list, 'pages': pages}

  return response_data, 200


# Get one patient by patientID
@jwt_required()
@app.route('/api/patients/<id>', methods=['GET'])
def get_patient(id):
  patient = db.patients.find_one({'patientID': int(id)})
  return make_response(dumps(patient)), 200


# Update one patient by patientID
@jwt_required()
@app.route('/api/patients/<id>', methods=['PUT'])
def update_patient(id):

  # Format data
  data = request.get_json()
  updated_patient = data.get('updatedPatient')
  del updated_patient['_id']
  new_fields = updated_patient.pop('newFields')

  # Update existing patient record with new data
  db.patients.update_one({'patientID': int(id)}, {'$set': updated_patient})

  # Check if there are any new fields
  if 'value' in new_fields[0]:
    # Update patient record with new fields
    for new_field in new_fields:
      db.patients.update_one(
          {'patientID': int(id)},
          {'$set': {
              new_field['field']: new_field['value']
          }})
    # Update field list with new fields
    new_fields = data.get('newFieldNames')
    for new_field in new_fields:
      db.fields.insert_one({'fieldName': new_field})

  return make_response(jsonify({'result': 'Patient updated successfully'}),
                       200)


# Delete one patient by patientID
@jwt_required()
@app.route('/api/patients/<id>', methods=['DELETE'])
def delete_patient(id):
  db.patients.delete_one({'patientID': int(id)})
  return make_response(jsonify({'result': 'Patient deleted successfully'}),
                       200)


# Auto-increment patientID for new patient
def get_next_patientID():
  return db.counter.find_one_and_update({'_id': 'patientID'},
                                        {'$inc': {
                                            'seq': 1
                                        }},
                                        return_document=True)['seq']


# Create new patient with generated ID
@jwt_required()
@app.route('/api/patients/new', methods=['POST'])
def create_patient():
  # Format data
  data = request.get_json()
  new_patient = data.get('patientEntry')
  new_patient['patientID'] = get_next_patientID()
  new_fields = new_patient.pop('newPatientNewFields')

  # Check if there are any new fields and format
  if 'value' in new_fields[0]:
    for new_field in new_fields:
      new_patient[new_field['field']] = new_field['value']
    # Update field list with new fields
    new_fields = data.get('newFieldNames')
    for new_field in new_fields:
      db.fields.insert_one({'fieldName': new_field})

  # Insert new patient
  db.patients.insert_one(new_patient)

  return make_response(jsonify({'result': 'Patient updated successfully'}),
                       200)


# Get all patient fields
@jwt_required()
@app.route('/api/fields', methods=['GET'])
def fields():
  fields = db.fields.find()
  fields_list = []
  for field in fields:
    fields_list.append(field['fieldName'])
  return make_response(fields_list), 200
