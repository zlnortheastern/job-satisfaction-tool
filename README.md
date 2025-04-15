# Job Satisfaction Predictor

This is a web-based tool that predicts employee job satisfaction using a Bayesian Network. The project features:

- A **React** frontend for user interaction
- A **Flask + pgmpy** backend that models job satisfaction with probabilistic inference
- Visualization of the Bayesian Network and CPT tables
- Prediction history tracking with company labels

## How to Run the Project Locally

> Make sure you have Python 3.8+ and Node.js 16+ installed.


### Backend Setup (Flask + pgmpy)

1. Open a terminal and navigate to the backend directory:
    ```bash
    cd backend
    ```

2. (Optional but recommended) Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate    # On Windows: venv\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install flask flask-cors pgmpy
    ```

4. Start the Flask server:
    ```bash
    python app.py
    ```

> The backend should now be running at: `http://localhost:5000`


### Frontend Setup (React)

1. Open a **new terminal** and go to the frontend folder:
    ```bash
    cd front-end
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

> The frontend will open in your browser at: `http://localhost:3000`


## Local Demo Instructions

1. Fill in your job-related preferences in the form (salary, interest fit, etc.)
2. Enter a **company name** (this is only stored locally)
3. Click "Predict Satisfaction"
4. The system will show the result and add it to the **prediction history**
5. Click "View Bayesian Network" to see the structure and CPTs interactively


## Tech Stack

| Layer     | Tech                   |
|-----------|------------------------|
| Frontend  | React, Bootstrap       |
| Backend   | Flask, pgmpy           |
| Modeling  | Discrete Bayesian Network (pgmpy) |
| Visualization | React Flow for Bayesian graph |


## Authors

-  Zhi Ling
-  Wilson Neira



