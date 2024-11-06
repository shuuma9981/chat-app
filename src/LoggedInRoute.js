// src/LoggedInRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthService';

const LoggedInRoute = () => {
    const user = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate replace to="/login" />;
};

export default LoggedInRoute;
