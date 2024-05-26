import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_USER'); // Default role
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        name,
        username,
        email,
        password,
        role,
      });
      setMessage(response.data.message); // Assuming backend sends a message field
      navigate('/signin');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Detailed error message from backend
      } else {
        setMessage('Sign up failed');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Role:</label>
                  <select
                    className="form-control"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="ROLE_USER">User</option>
                    <option value="ROLE_ADMIN">Admin</option>
                    <option value="ROLE_MANAGER">Manager</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
              </form>
              {message && <p className="mt-3 text-center">{message}</p>}
              <div className="text-center mt-2">
                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;


