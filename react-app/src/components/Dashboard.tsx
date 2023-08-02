import Navbar from "./Navbar";
import PatientTable from "./PatientTable";
import Details from "./Details";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [noOfPages, setPages] = useState(1);
  const [selectedPatientID, setSelectedPatientID] = useState(-1);
  const [selectedPageNo, setSelectedPageNo] = useState(1);
  const [searchEntry, setSearchEntry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("patientID");
  const [sortOrder, setSortOrder] = useState(1);

  useEffect(() => {
    // Make a request for all patients meeting search term
    axios
      .get(
        `http://127.0.0.1:5000/api/patients?page=${selectedPageNo}&search=${searchTerm}&field=${sortField}&order=${sortOrder}`,
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        setPatients(response.data["patients"]);
        setPages(response.data["pages"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [selectedPageNo, searchTerm, sortField, sortOrder]);

  return (
    <div className="container-fluid p-0">
      <div className="row gx-0">
        <div className="col-sm">
          <div className="row">
            <div className="container-fluid">
              <div className="row m-2">
                <div className="col-sm-4 gx-0">
                  <div className="input-group rounded">
                    <input
                      type="text"
                      className="form-control rounded"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      value={searchEntry}
                      onChange={(e) => setSearchEntry(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSearchTerm(searchEntry);
                        }
                      }}
                    />
                    <span
                      className="input-group-text border-0"
                      id="search-addon"
                      role="button"
                      onClick={() => setSearchTerm(searchEntry)}
                    >
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                </div>
                <div className="col-sm-8 px-5 d-flex align-items-center">
                  <b className="text-nowrap">Sort by:</b>
                  <select
                    className="form-control mx-3"
                    style={{ maxWidth: "150px" }}
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <option value="patientID">Patient ID</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="status">Status</option>
                  </select>
                  <select
                    className="form-control"
                    style={{ maxWidth: "150px" }}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value))}
                  >
                    <option value="1">Ascending</option>
                    <option value="-1">Descending</option>
                  </select>
                </div>
                <div className="col-sm gx-0"></div>
              </div>
            </div>
          </div>
          <div className="row gx-0">
            <PatientTable
              patients={patients}
              onSelectPatient={(patientID: number) => {
                setSelectedPatientID(patientID);
              }}
              onSelectPage={(pageNo: number) => {
                setSelectedPageNo(pageNo);
              }}
              noOfPages={noOfPages}
            />
          </div>
        </div>

        <div className="col-sm gx-5">
          <Details patientID={selectedPatientID} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
