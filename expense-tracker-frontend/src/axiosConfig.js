// src/axiosConfig.js

import axios from 'axios';

// Create an instance of axios with custom configuration
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000', // Base URL for API requests
    timeout: 5000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        // Add any additional headers you need here
    },
});

// Add a request interceptor to include authorization token (if needed)
axiosInstance.interceptors.request.use(
    config => {
        // Example: Add a token to the Authorization header
        const token = localStorage.getItem('authToken'); // Replace with your token source
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
    response => {
        // Handle successful responses
        return response;
    },
    error => {
        // Handle errors (e.g., show notifications, log errors)
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error('Unauthorized, redirecting to login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
