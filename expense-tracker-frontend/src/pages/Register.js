import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseContext from '../context/ExpenseContext';
import axios from '../axiosConfig';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { dispatch } = useContext(ExpenseContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/register', { username, email, password });

            // Assuming the response data contains a token
            const { token } = response.data;

            // Dispatch the token to the context
            dispatch({ type: 'REGISTER_USER', payload: token });

            // Redirect to another page after successful registration
            navigate('/dashboard');
        } catch (err) {
            // Set error state with a message
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
