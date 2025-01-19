import React from 'react';
import CTAForm from '@/components/forms/CTAForm';

const Contact: React.FC = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Join the App!</h1>
            <p className="py-6">
              Fill out the form, and we’ll be in touch soon!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl mr-4">
            <CTAForm />
          </div>
        </div>
      </div>

    </>


  );
};

export default Contact;
