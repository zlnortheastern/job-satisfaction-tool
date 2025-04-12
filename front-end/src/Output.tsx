import React from 'react';

interface OutputProps {
  result: string | null;
  loading: boolean;
  inputs: {
    salary: string;
    interestFit: string;
    companyCulture: string;
    companyReputation: string;
  };
}

export default function Output({ result, inputs, loading }: OutputProps) {
  return (
    <div className="card p-4 shadow-sm min-vh-25">
      <h5 className="mb-3">Prediction Result</h5>

      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Analyzing with Bayesian Network...</p>
        </div>
      ) : result ? (
        <div className="alert alert-info text-center fs-5">{result}</div>
      ) : (
        <p className="text-muted">Submit your job profile to see the predicted satisfaction level.</p>
      )}

      <hr />
      <h6 className="text-secondary">Your Inputs</h6>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Salary: {inputs.salary || '—'}</li>
        <li className="list-group-item">Interest Fit: {inputs.interestFit || '—'}</li>
        <li className="list-group-item">Company Culture: {inputs.companyCulture || '—'}</li>
        <li className="list-group-item">Company Reputation: {inputs.companyReputation || '—'}</li>
      </ul>
    </div>
  );
}
