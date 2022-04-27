import React, { useState, useContext } from 'react';
import SignupForm from './components/signup-form/SignupForm';
import { UserContext } from 'components/providers/UserProvider';
import '../login.css';

const SignupPage = () => {
    // const { user } = useContext(UserContext);

    return (
        <div className="auth-container">
            <div className="logo"></div>
            <div className="auth-form">
                <h2>Sign Up</h2>
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
