import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignIn({ onLogin }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  let navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        usernameOrEmail,
        password,
      });
      setMessage(response.data.message || 'Sign in successful');
      onLogin();
      navigate('/');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setMessage(`Sign in failed: ${error.response.data.message || error.response.data}`);
        console.error('Error response:', error.response);
      } else if (error.request) {
        // The request was made but no response was received
        setMessage('Sign in failed: No response from server');
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage(`Sign in failed: ${error.message}`);
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Sign In</h2>
              <form onSubmit={handleSignIn}>
                <div className="mb-3">
                  <label htmlFor="usernameOrEmail" className="form-label">
                    Username or Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="usernameOrEmail"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </form>
              {message && <p className="mt-3 text-center">{message}</p>}
              <div className="mt-3 text-center">
                <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

