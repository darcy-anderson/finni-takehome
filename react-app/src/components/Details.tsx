import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  patientID: number;
}

type FieldValuePair = {
  field: string;
  value: string;
};

type Patient = {
  patientID: number;
  firstName: string;
  middleName: string;
  lastName: string;
  status: string;
  dob: string;
  addresses: string[];
  newFields?: FieldValuePair[];
};

type NewPatient = {
  firstName: string;
  middleName: string;
  lastName: string;
  status: string;
  dob: string;
  addresses: string[];
  newFields?: FieldValuePair[];
};

// Display all details for one patient. Second tab allows entry of new patient.
function Details({ patientID }: Props) {
  const [selectedTab, setSelectedTab] = useState(1); // Track if existing or new patient tab is selected
  const [patient, setPatient] = useState<Patient>({
    // Currently entered patient data
    patientID: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    status: "",
    dob: "",
    addresses: [],
  });
  const [fields, setFields] = useState<string[]>([
    // List of all fields
    "patientID",
    "firstName",
    "middleName",
    "lastName",
    "status",
    "dob",
    "addresses",
  ]);
  const [extraFields, setExtraFields] = useState<string[]>([]); // List of non-basic fields
  const [newFields, setNewFields] = useState<string>(""); // Current state of new field text area
  const [changes, setChanges] = useState(false); // Display submit button only when changes made
  const [newPatient, setNewPatient] = useState<NewPatient>({
    // Currently entered new patient data
    firstName: "",
    middleName: "",
    lastName: "",
    status: "",
    dob: "",
    addresses: [],
  });
  const [newPatientNewFields, setNewPatientNewFields] = useState<string>(""); // Current state of new field text area for new patient tab

  // Request details for selected patient, and request field list
  useEffect(() => {
    if (patientID != -1) {
      axios
        .get(`http://127.0.0.1:5000/api/patients/${patientID}`, {
          withCredentials: true,
        })
        .then(function (response) {
          setPatient(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    axios
      .get(`http://127.0.0.1:5000/api/fields`, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        setFields(response.data);
        setExtraFields(
          fields.filter(
            (field) =>
              ![
                "patientID",
                "firstName",
                "middleName",
                "lastName",
                "status",
                "dob",
                "addresses",
              ].includes(field)
          )
        );
        setChanges(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [patientID]);

  // Process changes in existing patient details form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChanges(true);
    setPatient({
      ...patient,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChanges(true);
    setPatient({
      ...patient,
      [event.target.id]: event.target.value,
    });
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setChanges(true);
    let addressArray = event.target.value.split("\n");
    setPatient({ ...patient, [event.target.id]: addressArray });
  };

  const handleFormSubmit = () => {
    // Format new patient data
    setChanges(false);
    const fieldLines = newFields.split("\n");
    setNewFields("");
    const newFieldPairs: FieldValuePair[] = fieldLines.map((line) => {
      const [field, value] = line.split(": ");
      return { field, value };
    });
    const updatedPatient = {
      ...patient,
      newFields: patient.newFields
        ? [...patient.newFields, ...newFieldPairs]
        : newFieldPairs,
    };
    const newFieldNames = newFieldPairs.map((pair) => pair.field);

    // Send put request containing updated patient data, and newly created fields
    axios
      .put(`http://127.0.0.1:5000/api/patients/${patientID}`, {
        updatedPatient,
        newFieldNames,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Error updating patient:",
          error.response?.status,
          error.response?.statusText
        );
      });
  };

  // Send delete request for specific patient
  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:5000/api/patients/${patientID}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(
          "Error deleting patient:",
          error.response?.status,
          error.response?.statusText
        );
      });
  };

  // Process changes in new patient details form
  const handleNewPatientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPatient({
      ...newPatient,
      [event.target.id]: event.target.value,
    });
  };

  const handleNewPatientSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewPatient({
      ...newPatient,
      [event.target.id]: event.target.value,
    });
  };

  const handleNewPatientAddressChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let addressArray = event.target.value.split("\n");
    setNewPatient({ ...newPatient, [event.target.id]: addressArray });
  };

  const handleNewPatientFormSubmit = () => {
    // Format new patient data
    const fieldLines = newPatientNewFields.split("\n");
    const newFieldPairs: FieldValuePair[] = fieldLines.map((line) => {
      const [field, value] = line.split(": ");
      return { field, value };
    });
    const patientEntry = {
      ...newPatient,
      newPatientNewFields: newPatient.newFields
        ? [...newPatient.newFields, ...newFieldPairs]
        : newFieldPairs,
    };
    const newFieldNames = newFieldPairs.map((pair) => pair.field);

    // Clear form
    setNewPatient({
      firstName: "",
      middleName: "",
      lastName: "",
      status: "",
      dob: "",
      addresses: [],
    });
    setNewPatientNewFields("");

    // Send post request to create new patient and update new fields
    axios
      .post(`http://127.0.0.1:5000/api/patients/new`, {
        patientEntry,
        newFieldNames,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Error creating patient:",
          error.response?.status,
          error.response?.statusText
        );
      });
  };

  return (
    <>
      {/* Tab buttons for existing/new patient */}
      <div className="row p-3">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item p-3">
            <a
              className={selectedTab === 1 ? "nav-link active" : "nav-link"}
              onClick={() => {
                setSelectedTab(1);
              }}
              aria-current="page"
              href="#"
            >
              Patient Details
            </a>
          </li>
          <li className="nav-item p-3">
            <a
              className={selectedTab === 2 ? "nav-link active" : "nav-link"}
              onClick={() => {
                setSelectedTab(2);
              }}
              aria-current="page"
              href="#"
            >
              New Patient
            </a>
          </li>
        </ul>
      </div>

      {/* Start of existing patient tab */}
      {selectedTab === 1 ? (
        <div className="container-fluid">
          <div className="row">
            <label className="col-sm-2">
              <b>Patient ID: {patient ? patient.patientID : ""}</b>
            </label>
            <div className="col-sm-9"></div>
            <button
              type="button"
              className="btn btn-danger col-sm"
              onClick={handleDelete}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>

          {/* Start of basic field elements */}
          <div className="row">
            <div className="col">
              <label>
                <b>First Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={patient.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label>
                <b>Middle Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="middleName"
                value={patient.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label>
                <b>Last Name</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={patient.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>
              <b>Status</b>
            </label>
            <select
              className="form-control"
              id="status"
              value={patient.status}
              onChange={handleSelectChange}
            >
              <option selected disabled></option>
              <option>Inquiry</option>
              <option>Onboarding</option>
              <option>Active</option>
              <option>Churned</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <b>Date of Birth</b>
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="dob"
                value={patient.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>
              <b>Addresses</b>
            </label>
            <textarea
              className="form-control"
              id="addresses"
              onChange={handleAddressChange}
              value={patient.addresses.join("\n")}
            ></textarea>
          </div>

          {/* Dynamically generate form elements for non-basic fields */}
          {extraFields.map((field) => (
            <div className="col">
              <label>
                <b>{field.charAt(0).toUpperCase() + field.slice(1)}</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id={field}
                  value={(patient as any)[field] ? (patient as any)[field] : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}
          <br />

          {/* Text area for new field-value pairs */}
          <div className="form-group">
            <label>
              <b>Enter New Fields:</b>
            </label>
            <textarea
              className="form-control"
              id="new"
              value={newFields}
              onChange={(e) => {
                setNewFields(e.target.value);
                setChanges(true);
              }}
            ></textarea>
          </div>
          <br />

          {/* Display submit button only when form has been changed */}
          {changes && (
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleFormSubmit}
            >
              Submit Changes
            </button>
          )}
        </div>
      ) : (
        <div className="container-fluid">
          {/* Start of new patient tab */}
          {/* Start of basic field elements */}
          <div className="row">
            <div className="col">
              <label>
                <b>First Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={newPatient.firstName}
                onChange={handleNewPatientChange}
                required
              />
            </div>
            <div className="col">
              <label>
                <b>Middle Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="middleName"
                value={newPatient.middleName}
                onChange={handleNewPatientChange}
              />
            </div>
            <div className="col">
              <label>
                <b>Last Name</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={newPatient.lastName}
                  onChange={handleNewPatientChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                <b>Status</b>
              </label>
              <select
                className="form-control"
                id="status"
                value={newPatient.status}
                onChange={handleNewPatientSelectChange}
              >
                <option selected disabled></option>
                <option>Inquiry</option>
                <option>Onboarding</option>
                <option>Active</option>
                <option>Churned</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <b>Date of Birth</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="dob"
                  value={newPatient.dob}
                  onChange={handleNewPatientChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                <b>Addresses</b>
              </label>
              <textarea
                className="form-control"
                id="addresses"
                onChange={handleNewPatientAddressChange}
                value={newPatient.addresses.join("\n")}
              ></textarea>
            </div>
            {/* Dynamically generate non-basic form elements */}
            {extraFields.map((field) => (
              <div className="col">
                <label>
                  <b>{field.charAt(0).toUpperCase() + field.slice(1)}</b>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id={field}
                    value={
                      (newPatient as any)[field]
                        ? (newPatient as any)[field]
                        : ""
                    }
                    onChange={handleNewPatientChange}
                  />
                </div>
              </div>
            ))}
            {/* New field text area */}
            <div className="form-group">
              <label>
                <b>Enter New Fields:</b>
              </label>
              <textarea
                className="form-control"
                id="new"
                value={newPatientNewFields}
                onChange={(e) => setNewPatientNewFields(e.target.value)}
              ></textarea>
            </div>
          </div>
          <br />

          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleNewPatientFormSubmit}
          >
            Submit New Patient
          </button>
        </div>
      )}
    </>
  );
}

export default Details;
