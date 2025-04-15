import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputForm from "./InputForm";
import Output from "./Output";
import BayesianNetworkModal from "./BayesianNetworkModal";

export default function App() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    salary: "",
    interestFit: "",
    workLifeBalance: "",
    growthPotential: "",
    companyCulture: "",
    companyReputation: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState<{ company: string; result: string }[]>(
    []
  );

  const handleFormSubmit = async (
    inputValues: typeof inputs,
    companyName: string
  ) => {
    setInputs(inputValues);
    setLoading(true);
    setResult(null);
  
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues),
      });
  
      const data = await res.json();
  
      if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        const predicted = data.High > data.Low ? 'High' : 'Low';
        const confidence = data.High > data.Low ? data.High : data.Low;
        const resultText = `Predicted Satisfaction: ${predicted} (${confidence}%)`;
  
        setResult(resultText);
        setHistory((prev) => [...prev, { company: companyName, result: resultText }]);
      }
    } catch (err) {
      setResult('Error: Unable to connect to prediction service.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Job Satisfaction Predictor</h2>
      <div className="text-center">
        <button
          className="btn btn-outline-info"
          onClick={() => setShowModal(true)}
        >
          View Bayesian Network
        </button>
      </div>
      <hr></hr>
      <BayesianNetworkModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
      <div className="row">
        <div className="col-md-6">
          <InputForm onSubmit={handleFormSubmit} />
        </div>

        <div className="col-md-6">
          <Output result={result} inputs={inputs} loading={loading} />
        </div>
        {history.length > 0 && (
          <div className="mt-5">
            <h5>Prediction History</h5>
            <ul className="list-group">
              {history.map((entry, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span className="fw-bold">{entry.company}</span>
                  <span>{entry.result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
