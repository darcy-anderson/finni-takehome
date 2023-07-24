import { useState } from "react";

function Details() {
  let patient = {
    patientID: 14,
    firstName: "Ila",
    middleName: "Rosie",
    lastName: "Gould",
    status: "Active",
    dob: "12.07.1981",
    addresses: [
      "724 Bills Place, Crown, Oregon 79298",
      "564 Elton Street, Byrnedale, North Carolina 87048",
    ],
  };

  let fields = [
    "patientID",
    "firstName",
    "middleName",
    "lastName",
    "status",
    "dob",
    "addresses",
    "allergies",
    "notes",
  ];

  // Patient Details tab OR New Patient tab selected
  const [selectedTab, setSelectedTab] = useState(1);

  const [formPatient, setFormPatient] = useState(patient);
  const [formFields, setFormFields] = useState(fields);
  const [extraFormFields, setExtraFormFields] = useState(
    formFields.filter(
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormPatient({
      ...formPatient,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormPatient({
      ...formPatient,
      [event.target.id]: event.target.value,
    });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let addressArray = event.target.value.split("\n");
    setFormPatient({ ...formPatient, [event.target.id]: addressArray });
  };

  return (
    <>
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

      <form>
        <div className="container-fluid">
          <label>
            <b>Patient ID: {patient.patientID}</b>
          </label>
          <div className="row">
            <div className="col">
              <label>first name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={formPatient.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label>middle name</label>
              <input
                type="text"
                className="form-control"
                id="middleName"
                value={formPatient.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label>last name</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formPatient.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>status</label>
            <select
              className="form-control"
              id="status"
              value={formPatient.status}
              onChange={handleSelectChange}
            >
              <option>Inquiry</option>
              <option>Onboarding</option>
              <option>Active</option>
              <option>Churned</option>
            </select>
          </div>
          <div className="form-group">
            <label>date of birth</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="dob"
                value={formPatient.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>addresses</label>
            <textarea
              className="form-control"
              id="addresses"
              onChange={handleTextChange}
              value={formPatient.addresses.join("\n")}
            ></textarea>
          </div>
          {extraFormFields.map((field) => (
            <div className="col">
              <label>{field}</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="{field}"
                  value={(formPatient as any)[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ))}
          <br />
          <label>
            <b>Enter new field:</b>
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="newField"
              placeholder="new field name"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="newValue"
              placeholder="new field value"
              required
            />
          </div>
          <br />
          <button className="btn btn-primary" type="submit">
            Submit Changes
          </button>
        </div>
      </form>
    </>
  );
}

export default Details;
