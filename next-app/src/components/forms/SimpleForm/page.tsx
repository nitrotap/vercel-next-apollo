import React, { useState } from 'react';

const SimpleForm: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(`Form submitted with input: ${inputValue}`);
    };

    return (
        <div className="card bg-base-200 w-80">
            <div className="card-body">
                <input placeholder="Email" className="input input-bordered" />
                <label className="label cursor-pointer">
                    Accept terms of use
                    <input type="checkbox" className="toggle" />
                </label>
                <label className="label cursor-pointer">
                    Submit to newsletter
                    <input type="checkbox" className="toggle" />
                </label>
                <button className="btn btn-neutral">Save</button>
            </div>
        </div>
    );
};

export default SimpleForm;