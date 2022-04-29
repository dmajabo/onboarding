import React, { useState, useContext } from 'react';
import SignupForm from './components/signup-form/SignupForm';
import '../styles.scss';

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
