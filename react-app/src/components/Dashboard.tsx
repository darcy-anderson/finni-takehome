import Navbar from "./Navbar";
import PatientTable from "./PatientTable";
import Details from "./Details";

function Dashboard() {
  let patients: any[] = [
    {
      patientID: 1,
      firstName: "Becker",
      middleName: "Darlene",
      lastName: "Cox",
      status: "Active",
      dob: "05.17.1988",
      addresses: [
        {
          street: "102 Maujer Street",
          city: "Linganore",
          state: "South Carolina",
          zip: "45000",
        },
      ],
    },
    {
      patientID: 2,
      firstName: "Michele",
      middleName: "Edna",
      lastName: "Valencia",
      status: "Active",
      dob: "10.15.1980",
      addresses: [
        {
          street: "284 Highland Avenue",
          city: "Sanford",
          state: "Maryland",
          zip: "80621",
        },
        {
          street: "395 Amboy Street",
          city: "Bennett",
          state: "Rhode Island",
          zip: "42935",
        },
      ],
    },
    {
      patientID: 3,
      firstName: "Green",
      middleName: "Karen",
      lastName: "Gates",
      status: "Active",
      dob: "06.15.1958",
      addresses: [
        {
          street: "665 Tampa Court",
          city: "Edmund",
          state: "West Virginia",
          zip: "70781",
        },
      ],
    },
    {
      patientID: 4,
      firstName: "Allison",
      middleName: "Preston",
      lastName: "Pruitt",
      status: "Onboarding",
      dob: "05.22.1987",
      addresses: [
        {
          street: "364 Linden Boulevard",
          city: "Barronett",
          state: "Marshall Islands",
          zip: "33728",
        },
        {
          street: "610 Vandervoort Avenue",
          city: "Sussex",
          state: "Alaska",
          zip: "51255",
        },
      ],
    },
    {
      patientID: 5,
      firstName: "Teri",
      middleName: "Kristen",
      lastName: "Walsh",
      status: "Onboarding",
      dob: "01.06.1955",
      addresses: [
        {
          street: "148 Bushwick Place",
          city: "Cuylerville",
          state: "New Hampshire",
          zip: "56003",
        },
      ],
    },
    {
      patientID: 6,
      firstName: "Welch",
      middleName: "Ann",
      lastName: "Lane",
      status: "Churned",
      dob: "01.21.1999",
      addresses: [
        {
          street: "144 Clifford Place",
          city: "Riverton",
          state: "Iowa",
          zip: "02164",
        },
        {
          street: "425 Royce Street",
          city: "Valmy",
          state: "California",
          zip: "74306",
        },
      ],
    },
    {
      patientID: 7,
      firstName: "Evelyn",
      middleName: "Underwood",
      lastName: "Reilly",
      status: "Active",
      dob: "09.19.1986",
      addresses: [
        {
          street: "428 Norman Avenue",
          city: "Savage",
          state: "Federated States Of Micronesia",
          zip: "24169",
        },
      ],
    },
    {
      patientID: 8,
      firstName: "Lydia",
      middleName: "Mckee",
      lastName: "Cash",
      status: "Onboarding",
      dob: "09.29.1970",
      addresses: [
        {
          street: "866 Hyman Court",
          city: "Charco",
          state: "Mississippi",
          zip: "23781",
        },
      ],
    },
    {
      patientID: 9,
      firstName: "Erickson",
      middleName: "Mitzi",
      lastName: "Ballard",
      status: "Active",
      dob: "11.25.1976",
      addresses: [
        {
          street: "136 Nautilus Avenue",
          city: "Dodge",
          state: "Michigan",
          zip: "44622",
        },
      ],
    },
    {
      patientID: 10,
      firstName: "Boyd",
      middleName: "Flossie",
      lastName: "Meadows",
      status: "Churned",
      dob: "09.09.1953",
      addresses: [
        {
          street: "781 Blake Avenue",
          city: "Moscow",
          state: "Idaho",
          zip: "15298",
        },
      ],
    },
    {
      patientID: 11,
      firstName: "Carol",
      middleName: "Kristie",
      lastName: "Hahn",
      status: "Churned",
      dob: "04.08.2006",
      addresses: [
        {
          street: "781 Blake Avenue",
          city: "Moscow",
          state: "Idaho",
          zip: "15298",
        },
      ],
    },
    {
      patientID: 12,
      firstName: "Francisca",
      middleName: "Gamble",
      lastName: "Odom",
      status: "Onboarding",
      dob: "02.18.1995",
      addresses: [
        {
          street: "653 Montague Street",
          city: "Gardiner",
          state: "Florida",
          zip: "71581",
        },
        {
          street: "248 Oxford Walk",
          city: "Sylvanite",
          state: "New Mexico",
          zip: "26606",
        },
      ],
    },
    {
      patientID: 13,
      firstName: "Conley",
      middleName: "Terri",
      lastName: "Hammond",
      status: "Onboarding",
      dob: "06.11.1976",
      addresses: [
        {
          street: "634 Batchelder Street",
          city: "Westerville",
          state: "Nevada",
          zip: "92653",
        },
      ],
    },
    {
      patientID: 14,
      firstName: "Ila",
      middleName: "Rosie",
      lastName: "Gould",
      status: "Active",
      dob: "12.07.1981",
      addresses: [
        {
          street: "724 Bills Place",
          city: "Crown",
          state: "Oregon",
          zip: "79298",
        },
        {
          street: "564 Elton Street",
          city: "Byrnedale",
          state: "North Carolina",
          zip: "87048",
        },
      ],
    },
    {
      patientID: 15,
      firstName: "Tia",
      middleName: "Marian",
      lastName: "Morris",
      status: "Inquiry",
      dob: "01.03.2010",
      addresses: [
        {
          street: "235 Canal Avenue",
          city: "Brandermill",
          state: "Tennessee",
          zip: "85716",
        },
      ],
    },
    {
      patientID: 16,
      firstName: "Dionne",
      middleName: "Hollie",
      lastName: "Ochoa",
      status: "Inquiry",
      dob: "04.19.1986",
      addresses: [
        {
          street: "235 Canal Avenue",
          city: "Brandermill",
          state: "Tennessee",
          zip: "85716",
        },
      ],
    },
    {
      patientID: 17,
      firstName: "Patti",
      middleName: "Mia",
      lastName: "Arnold",
      status: "Onboarding",
      dob: "05.17.2009",
      addresses: [
        {
          street: "504 Atlantic Avenue",
          city: "Courtland",
          state: "Puerto Rico",
          zip: "02461",
        },
      ],
    },
    {
      patientID: 18,
      firstName: "Bonner",
      middleName: "Molly",
      lastName: "Mccoy",
      status: "Churned",
      dob: "03.22.1991",
      addresses: [
        {
          street: "355 Grace Court",
          city: "Hoagland",
          state: "North Dakota",
          zip: "90239",
        },
        {
          street: "720 Goodwin Place",
          city: "Kylertown",
          state: "Virgin Islands",
          zip: "29243",
        },
      ],
    },
    {
      patientID: 19,
      firstName: "Clarke",
      middleName: "Katheryn",
      lastName: "Benjamin",
      status: "Onboarding",
      dob: "06.19.1993",
      addresses: [
        {
          street: "314 Church Lane",
          city: "Carlos",
          state: "Kansas",
          zip: "30202",
        },
      ],
    },
    {
      patientID: 20,
      firstName: "Henrietta",
      middleName: "Consuelo",
      lastName: "Cameron",
      status: "Onboarding",
      dob: "10.28.1973",
      addresses: [
        {
          street: "314 Church Lane",
          city: "Carlos",
          state: "Kansas",
          zip: "30202",
        },
        {
          street: "269 Ruby Street",
          city: "Dotsero",
          state: "Kentucky",
          zip: "83109",
        },
      ],
    },
  ];

  let noOfPages = 4;
  let selectedPatientID = 1;

  return (
    <div className="container-fluid p-0">
      <div className="row gx-0">
        <div className="col-sm">
          <PatientTable
            patients={patients}
            onSelectPatient={(patientID: number) => {
              selectedPatientID = patientID;
            }}
            noOfPages={noOfPages}
          />
        </div>

        <div className="col-sm border-start border-5 border-warning gx-5">
          <Details />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
