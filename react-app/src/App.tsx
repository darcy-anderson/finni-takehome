import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { AuthProvider, RequireAuth } from "react-auth-kit";

function App() {
  return (
    <AuthProvider
      authType="cookie"
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />

          {/* element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          } */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
