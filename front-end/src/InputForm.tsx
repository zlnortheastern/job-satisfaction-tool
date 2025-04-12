import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (inputs: {
    salary: string;
    interestFit: string;
    companyCulture: string;
    companyReputation: string;
  }) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
  const [salary, setSalary] = useState('');
  const [interestFit, setInterestFit] = useState('');
  const [companyCulture, setCompanyCulture] = useState('');
  const [companyReputation, setCompanyReputation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ salary, interestFit, companyCulture, companyReputation });
  };

  const renderRadioButtons = (
    label: string,
    name: string,
    options: string[],
    value: string,
    setValue: (val: string) => void
  ) => {
    return (
      <div className="row align-items-center mb-4">
        {/* Label */}
        <div className="col-md-3 fw-bold text-md-end text-start mb-2 mb-md-0">
          {label}:
        </div>

        {/* Radio Buttons */}
        <div className="col-md-7 d-flex flex-wrap gap-2">
          {options.map((opt) => {
            const id = `${name}-${opt.replace(/\s/g, '').toLowerCase()}`;
            return (
              <div key={id}>
                <input
                  type="radio"
                  className="btn-check"
                  name={name}
                  id={id}
                  autoComplete="off"
                  checked={value === opt}
                  onChange={() => setValue(opt)}
                />
                <label className="btn btn-outline-primary" htmlFor={id}>
                  {opt}
                </label>
              </div>
            );
          })}
        </div>

        {/* Clear Button */}
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => setValue('')}
          >
            Clear
          </button>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h5 className="mb-4">Job Profile</h5>

      {renderRadioButtons('Salary', 'salary', ['High', 'Medium', 'Low'], salary, setSalary)}
      {renderRadioButtons('Interest Fit', 'interestFit', ['Strong', 'Weak'], interestFit, setInterestFit)}
      {renderRadioButtons('Company Culture', 'companyCulture', ['Supportive', 'Toxic'], companyCulture, setCompanyCulture)}
      {renderRadioButtons('Company Reputation', 'companyReputation', ['High', 'Low'], companyReputation, setCompanyReputation)}

      <div className="row mt-4">
        <div className="col-md-12">
          <button type="submit" className="btn btn-success w-100">
            Predict Satisfaction
          </button>
        </div>
      </div>
    </form>
  );
}
