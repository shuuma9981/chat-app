// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthContext } from '../AuthService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/');  // ログイン成功後にルートへリダイレクト
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (user) {
        return <Navigate replace to="/" />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">E-mail</label>
                <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
