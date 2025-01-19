'use client';
import React, { useState } from 'react';

const CTAForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(event.target.value);
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedTerms(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    alert(`Form submitted with: \nName: ${name}\nEmail: ${email}\nWebsite: ${website}\nAbout: ${about}\nPassword: ${password}`);
  };

  return (
    <div className="card-body" >
      <form onSubmit={handleSubmit}>
        <div className="form-control" >
          <label className="label" >
            <span className="label-text" > Name </span>
          </label>
          < input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        < div className="form-control mt-4" >
          <label className="label" >
            <span className="label-text" > Email </span>
          </label>
          < input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        < div className="form-control mt-4" >
          <label className="label" >
            <span className="label-text" > Website </span>
          </label>
          < input
            type="url"
            placeholder="Enter your website"
            className="input input-bordered"
            value={website}
            onChange={handleWebsiteChange}
          />
        </div>
        < div className="form-control mt-4" >
          <label className="label" >
            <span className="label-text" > Please tell us about yourself and your experience teaching, if any.</span>
          </label>
          < textarea
            placeholder="Write about yourself..."
            className="textarea textarea-bordered"
            value={about}
            onChange={handleAboutChange}
            required
          ></textarea>
        </div>
        < div className="form-control mt-4" >
          <label className="label" >
            <span className="label-text" > Password </span>
          </label>
          < input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        < div className="form-control mt-4" >
          <label className="label cursor-pointer" >
            <span className="label-text" >
              Accept our{' '}
              <a href="/terms" className="link link-primary" >
                terms and conditions
              </a>
            </span>
            < input
              type="checkbox"
              className="checkbox"
              checked={acceptedTerms}
              onChange={handleTermsChange}
              required
            />
          </label>
        </div>
        < div className="form-control mt-4" >
          <button type="submit" className="btn btn-neutral" >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CTAForm;
