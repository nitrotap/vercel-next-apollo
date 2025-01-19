import React, { useState, useCallback, memo } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, SIGNUP_USER } from '../../../app/auth/mutations';


// Constants to avoid magic strings
const TABS = {
  LOGIN: 'login',
  SIGNUP: 'signup'
} as const;

type TabType = typeof TABS[keyof typeof TABS];

// Form field configuration for better maintainability
const FORM_FIELDS = {
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email'
  },
  password: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
  },
  confirmPassword: {
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password'
  }
} as const;

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  name: string;
}

// Memoized FormField component to prevent unnecessary re-renders
const FormField = memo<FormFieldProps>(({
  label,
  type,
  value,
  onChange,
  placeholder = '',
  required = false,
  name,
}) => (
  <div className="form-control mt-4">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="input input-bordered"
      value={value}
      onChange={onChange}
      required={required}
      name={name}
    />
  </div>
));

FormField.displayName = 'FormField';

interface TermsCheckboxProps {
  acceptedTerms: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Memoized TermsCheckbox component
const TermsCheckbox = memo<TermsCheckboxProps>(({
  acceptedTerms,
  onChange,
}) => (
  <div className="form-control mt-4">
    <label className="label cursor-pointer">
      <span className="label-text">
        Accept our{' '}
        <a href="/terms" className="link link-primary">
          terms and conditions
        </a>
      </span>
      <input
        type="checkbox"
        className="checkbox"
        checked={acceptedTerms}
        onChange={onChange}
        required
        name="acceptedTerms"
      />
    </label>
  </div>
));

TermsCheckbox.displayName = 'TermsCheckbox';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

// Memoized tab button component
const TabButton = memo<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}>(({ active, onClick, children }) => (
  <button
    className={`tab ${active ? 'tab-active' : ''}`}
    onClick={onClick}
    role="tab"
    type="button"
  >
    {children}
  </button>
));

TabButton.displayName = 'TabButton';

const AuthForm: React.FC = () => {
  const [login] = useMutation(LOGIN_USER);
  const [signup] = useMutation(SIGNUP_USER);


  const [activeTab, setActiveTab] = useState<TabType>(TABS.LOGIN);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false
  });

  // Memoized handlers to prevent unnecessary re-creation
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);


  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.acceptedTerms) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    if (activeTab === TABS.SIGNUP && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      if (activeTab === TABS.LOGIN) {
        const { data } = await login({
          variables: {
            email: formData.email,
            password: formData.password,
          },
        });

        console.log('Login success:', data);
        sessionStorage.setItem('token', data.login.token);
      } else {
        const { data } = await signup({
          variables: {
            email: formData.email,
            password: formData.password,
          },
        });
        console.log('Signup success:', data);

        sessionStorage.setItem('token', data.addUser.token);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  }, [formData, activeTab, login, signup]);

  // Memoized tab change handlers
  const handleLoginTab = useCallback(() => setActiveTab(TABS.LOGIN), []);
  const handleSignupTab = useCallback(() => setActiveTab(TABS.SIGNUP), []);

  return (
    <div className="card bg-base-200 w-80">
      <div className="card-body">
        <div className="tabs tabs-boxed" role="tablist">
          <TabButton
            active={activeTab === TABS.LOGIN}
            onClick={handleLoginTab}
          >
            Login
          </TabButton>
          <TabButton
            active={activeTab === TABS.SIGNUP}
            onClick={handleSignupTab}
          >
            Signup
          </TabButton>
        </div>

        <form onSubmit={handleSubmit}>
          {Object.entries(FORM_FIELDS).map(([key, field]) => (
            (key !== 'confirmPassword' || activeTab === TABS.SIGNUP) && (
              <FormField
                key={key}
                label={field.label}
                type={field.type}
                value={formData[key as keyof FormData] as string}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                name={key}
                required
              />
            )
          ))}

          <TermsCheckbox
            acceptedTerms={formData.acceptedTerms}
            onChange={handleInputChange}
          />

          <div className="form-control mt-4">
            <button type="submit" className="btn btn-neutral">
              {activeTab === TABS.LOGIN ? 'Login' : 'Signup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(AuthForm);
