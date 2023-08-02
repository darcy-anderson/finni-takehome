## Finni Health Take-Home Interview Project - Patient Management Dashboard

### Description

This project aims to create a simple, user-friendly web dashboard enabling medical providers to perform CRUD operations on patient details. It incorporates patient search and sorting, creation of new patients, deletion of existing patients, updating of existing patient details, and adding new data fields that are applied to all patient records.

The tech stack consists of a React.js frontend user interface, a Python Flask backend application with RESTful API, and a MongoDB schemaless database.

### Usage

To run locally, ensure there is a MongoDB deployment running at localhost:27017. A dump of an example database with valid formatting is included. To restore from the included dump directory, run:

```
mongorestore --db=<database-name> <path-to-dump-directory>
```

To install requirements, run:

```
cd flask-app
pip install -r requirements.txt
cd react-app
npm install
```

To run locally, execute these commands in separate terminal windows:

```
flask run --debug
npm start
```
