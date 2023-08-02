import { useState } from "react";

interface Props {
  patients: any[];
  onSelectPatient: (patientID: number) => void;
  onSelectPage: (pageNo: number) => void;
  noOfPages: number;
}

// Table displaying pages of 10 patients at a time
function PatientTable({
  patients,
  onSelectPatient,
  onSelectPage,
  noOfPages,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Array of page numbers
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

      {/*/ Dynamically generate page buttons */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {pages.map((pageNo) => (
            <li
              className="page-item"
              key={pageNo}
              role="button"
              onClick={() => {
                onSelectPage(pageNo);
                setSelectedIndex(-1);
              }}
            >
              <a className="page-link">{pageNo}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default PatientTable;
