import { useState } from "react";

interface Props {
  patients: any[];
  onSelectPatient: (patientID: number) => void;
  noOfPages: number;
}

function PatientTable({ patients, onSelectPatient, noOfPages }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  let pages = [];
  for (let i = 1; i <= noOfPages; i++) {
    pages.push(i);
  }

  return (
    <>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Patient ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              className={selectedIndex === index ? "table-active" : ""}
              onClick={() => {
                setSelectedIndex(index);
                onSelectPatient(patient["patientID"]);
              }}
              key={patient["patientID"]}
            >
              <th scope="row">{patient["patientID"]}</th>
              <td>{patient["firstName"]}</td>
              <td>{patient["lastName"]}</td>
              <td>{patient["status"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item" key="prev">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          {pages.map((pageNo) => (
            <li className="page-item" key={pageNo}>
              <a className="page-link" href="#">
                {pageNo}
              </a>
            </li>
          ))}
          <li className="page-item" key="next">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default PatientTable;
