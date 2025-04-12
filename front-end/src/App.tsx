import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [salary, setSalary] = useState('');
  const [interestFit, setInterestFit] = useState('');
  const [companyCulture, setCompanyCulture] = useState('');
  const [companyReputation, setCompanyReputation] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated backend result — replace this with real inference logic
    const mockPrediction = 'High';
    const confidence = '76%';
    setResult(`Predicted Satisfaction: ${mockPrediction} (${confidence})`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-5">Job Satisfaction Predictor</h2>
      
      <div className="row">
        {/* Input Panel */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <h5 className="mb-3">Job Profile</h5>

            <div className="mb-3">
              <label className="form-label">Salary</label>
              <select className="form-select" value={salary} onChange={(e) => setSalary(e.target.value)} required>
                <option value="">Choose...</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Interest Fit</label>
              <select className="form-select" value={interestFit} onChange={(e) => setInterestFit(e.target.value)} required>
                <option value="">Choose...</option>
                <option value="Strong">Strong</option>
                <option value="Weak">Weak</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Company Culture</label>
              <select className="form-select" value={companyCulture} onChange={(e) => setCompanyCulture(e.target.value)} required>
                <option value="">Choose...</option>
                <option value="Supportive">Supportive</option>
                <option value="Toxic">Toxic</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Company Reputation</label>
              <select className="form-select" value={companyReputation} onChange={(e) => setCompanyReputation(e.target.value)} required>
                <option value="">Choose...</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">Predict Satisfaction</button>
          </form>
        </div>

        {/* Output Panel */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Prediction Result</h5>
            {result ? (
              <div className="alert alert-info text-center fs-5">
                {result}
              </div>
            ) : (
              <p className="text-muted">Submit your job profile to see the predicted satisfaction level.</p>
            )}

            {/* Optional summary */}
            <hr />
            <h6 className="text-secondary">Your Inputs</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Salary: {salary || '—'}</li>
              <li className="list-group-item">Interest Fit: {interestFit || '—'}</li>
              <li className="list-group-item">Company Culture: {companyCulture || '—'}</li>
              <li className="list-group-item">Company Reputation: {companyReputation || '—'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
