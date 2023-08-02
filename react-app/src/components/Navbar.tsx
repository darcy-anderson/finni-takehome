import fox from "../../fox.svg";
import { useSignOut, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

// Navbar present throughout site
function Navbar() {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const auth = useIsAuthenticated();

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
            {/*/ Only display logout button when logged in */}
            <li className="nav-item active">
              {auth() ? (
                <a className="nav-link" role="button" onClick={logOut}>
                  Log Out
                </a>
              ) : (
                <a> </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
