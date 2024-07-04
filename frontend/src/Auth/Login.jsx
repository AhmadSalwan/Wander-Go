import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/list_user');
        const data = await response.json();
        const { users } = data;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('user_id', user.id);
            setMessage("Login Successful");
            navigate('/app'); // Redirect to app page
        } else {
            setMessage("Invalid Password");
        }
    }

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default Login;
