// src/pages/SignUp.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                return updateProfile(user, {
                    displayName: name,  // サインアップ時にユーザー名を登録
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
            </div>
            <div>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
