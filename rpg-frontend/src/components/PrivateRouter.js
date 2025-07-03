import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';



const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/" replace />

    }
    return children
};

export default PrivateRoute