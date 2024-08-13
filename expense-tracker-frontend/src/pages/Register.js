import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExpenseContext from '../context/ExpenseContext';
import axios from '../axiosConfig';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { dispatch } = useContext(ExpenseContext);
  const navigate = useNavigate();


  useEffect(() => {

    const token = localStorage.getItem('token')

    console.log('huuu', token)

    if (token) {
        navigate('/')
    }

  },[])

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/register', { username, email, password });

      // Assuming the response data contains a token
      const { token } = response.data;

      // Dispatch the token to the context
      dispatch({ type: 'REGISTER_USER', payload: token });

      // Redirect to another page after successful registration
      navigate('/');
    } catch (err) {
      // Set error state with a message
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.registerButton}>
            Register
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <div style={styles.signInLink}>
          <span>Already have an account? </span>
          <Link to="/login"style={styles.link}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f6fa',
  },
  formContainer: {
    width: '400px',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: '30px',
    fontSize: '28px',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: '#333',
  },
  registerButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  registerButtonHover: {
    backgroundColor: '#218838',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
  signInLink: {
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default Register;
