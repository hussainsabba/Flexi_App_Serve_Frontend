// src/pages/Login.js

import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { login } from '../services/api'; // Email/password login
import authService from '../services/authService'; // OAuth handling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({ email, password });
            console.log('Login success:', response.data);
            authService.login(response.data.token); // Store token using authService
            navigate('/profile'); // Redirect to profile using navigate
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const responseGoogle = async (response) => {
        console.log(response);
        try {
            const userData = await authService.login(response.tokenId); // Use authService to handle login
            console.log('Google login success:', userData);
            navigate('/profile'); // Redirect to profile using navigate
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <GoogleLogin
                clientId="your_google_client_id" // Use your Google client ID
                buttonText="Login with Google"
                onSuccess={responseGoogle} // Correctly set onSuccess
                onFailure={responseGoogle} // Correctly set onFailure
                cookiePolicy={'single_host_origin'}
            />
        </form>
    );
};

export default Login;