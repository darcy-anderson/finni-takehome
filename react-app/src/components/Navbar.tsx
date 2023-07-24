import fox from "../../fox.svg";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const signOut = useSignOut();

  const logOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="px-3">
          <img src={fox} width="30" height="30" alt=""></img>
        </div>

        <a className="navbar-brand" href="#">
          Patient Management Dashboard
        </a>
        <div className="collapse navbar-collapse px-3" id="navbarText">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" onClick={logOut}>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
