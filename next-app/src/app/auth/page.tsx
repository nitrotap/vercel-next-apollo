'use client';
import React from 'react';
import AuthForm from '../../components/forms/AuthForm';

const Login: React.FC = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center lg:text-center">
            <h1 className="text-5xl font-bold">Get Started</h1>
            <p className="py-6">
              Log in or create an account to start.
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default Login;
