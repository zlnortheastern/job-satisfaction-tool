import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputForm from './InputForm';
import Output from './Output';

export default function App() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    salary: '',
    interestFit: '',
    companyCulture: '',
    companyReputation: '',
  });

  const handleFormSubmit = (inputValues: typeof inputs) => {
    setInputs(inputValues);
    setLoading(true);
    setResult(null); // reset old result

    // Simulate backend call with 2s delay
    setTimeout(() => {
      const mockPrediction = 'High';
      const confidence = '76%';
      setResult(`Predicted Satisfaction: ${mockPrediction} (${confidence})`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-5">Job Satisfaction Predictor</h2>

      <div className="row">
        <div className="col-md-6">
          <InputForm onSubmit={handleFormSubmit} />
        </div>

        <div className="col-md-6">
          <Output result={result} inputs={inputs} loading={loading} />
        </div>
      </div>
    </div>
  );
}
