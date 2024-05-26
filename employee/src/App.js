import React, { useState } from 'react';
import './App.css';
import Home from './Home';
import EmployeeView from './employee/EmployeeView';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './common/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AddEmployee from './employee/AddEmployee';
import EmployeeProfile from './employee/EmployeeProfile';
import EditEmployee from './employee/EditEmployee';
import SignUp from './login/SignUp';
import SignIn from './login/SignIn';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);

  const handleLogin = (token, roles) => {
    setIsAuthenticated(true);
    setToken(token);
    setRoles(roles);
  };

  const PrivateRoute = ({ element, requiredRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
    if (requiredRoles && (!roles || !requiredRoles.some(role => roles.includes(role)))) {
      return <Navigate to="/" />; // or a 403 Forbidden page
    }
    return element;
  };
 
  
    
  
  return (
    <main className="container mt-5">
      <Router>
        <NavbarWrapper isAuthenticated={isAuthenticated} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/view-emp" element={<PrivateRoute element={<EmployeeView />} requiredRoles={['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER']} />} />
          <Route exact path="/add-emp" element={<PrivateRoute element={<AddEmployee  />} requiredRoles={['ROLE_ADMIN']} />} />
          <Route exact path="/edit-emp/:id" element={<PrivateRoute element={<EditEmployee  />} requiredRoles={['ROLE_ADMIN']} />} />
          <Route exact path="/emp-profile/:id" element={<PrivateRoute element={<EmployeeProfile />} requiredRoles={['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER']} />} />
          <Route exact path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </main>
  );
}

const NavbarWrapper = ({ isAuthenticated }) => {
  const location = useLocation();
  const showNavbar = isAuthenticated || (!['/signin', '/signup'].includes(location.pathname));
  
  return showNavbar ? <Navbar /> : null;
};

export default App;

