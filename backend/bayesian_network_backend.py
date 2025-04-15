from flask import Flask, request, jsonify
from pgmpy.models import DiscreteBayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Model structure
model = DiscreteBayesianNetwork([
    ('CompanyCulture', 'WorkLifeBalance'),
    ('CompanyReputation', 'GrowthPotential'),
    ('Salary', 'JobSatisfaction'),
    ('WorkLifeBalance', 'JobSatisfaction'),
    ('InterestFit', 'JobSatisfaction'),
    ('GrowthPotential', 'JobSatisfaction')
])

# CPDs
cpd_salary = TabularCPD('Salary', 3, [[0.2], [0.5], [0.3]], state_names={'Salary': ['High', 'Medium', 'Low']})
cpd_interest = TabularCPD('InterestFit', 2, [[0.3], [0.7]], state_names={'InterestFit': ['Strong', 'Weak']})
cpd_rep = TabularCPD('CompanyReputation', 2, [[0.9], [0.1]], state_names={'CompanyReputation': ['High', 'Low']})
cpd_culture = TabularCPD('CompanyCulture', 2, [[0.8], [0.2]], state_names={'CompanyCulture': ['Supportive', 'Toxic']})

cpd_growth = TabularCPD('GrowthPotential', 2,
    [[0.9, 0.5], [0.1, 0.5]],
    evidence=['CompanyReputation'],
    evidence_card=[2],
    state_names={'GrowthPotential': ['High', 'Low'], 'CompanyReputation': ['High', 'Low']})

cpd_wlb = TabularCPD('WorkLifeBalance', 2,
    [[0.9, 0.2], [0.1, 0.8]],
    evidence=['CompanyCulture'],
    evidence_card=[2],
    state_names={'WorkLifeBalance': ['Good', 'Poor'], 'CompanyCulture': ['Supportive', 'Toxic']})

# Job Satisfaction CPD table
job_sat_table = [
    ['High', 'Good', 'Strong', 'High', 0.95, 0.05],
    ['High', 'Good', 'Strong', 'Low', 0.9, 0.1],
    ['High', 'Good', 'Weak', 'High', 0.75, 0.25],
    ['High', 'Good', 'Weak', 'Low', 0.6, 0.4],
    ['High', 'Poor', 'Strong', 'High', 0.8, 0.2],
    ['High', 'Poor', 'Strong', 'Low', 0.5, 0.5],
    ['High', 'Poor', 'Weak', 'High', 0.5, 0.5],
    ['High', 'Poor', 'Weak', 'Low', 0.3, 0.7],
    ['Medium', 'Good', 'Strong', 'High', 0.85, 0.15],
    ['Medium', 'Good', 'Strong', 'Low', 0.8, 0.2],
    ['Medium', 'Good', 'Weak', 'High', 0.65, 0.35],
    ['Medium', 'Good', 'Weak', 'Low', 0.5, 0.5],
    ['Medium', 'Poor', 'Strong', 'High', 0.7, 0.3],
    ['Medium', 'Poor', 'Strong', 'Low', 0.5, 0.5],
    ['Medium', 'Poor', 'Weak', 'High', 0.45, 0.55],
    ['Medium', 'Poor', 'Weak', 'Low', 0.2, 0.8],
    ['Low', 'Good', 'Strong', 'High', 0.6, 0.4],
    ['Low', 'Good', 'Strong', 'Low', 0.55, 0.45],
    ['Low', 'Good', 'Weak', 'High', 0.4, 0.6],
    ['Low', 'Good', 'Weak', 'Low', 0.25, 0.75],
    ['Low', 'Poor', 'Strong', 'High', 0.45, 0.55],
    ['Low', 'Poor', 'Strong', 'Low', 0.25, 0.75],
    ['Low', 'Poor', 'Weak', 'High', 0.15, 0.85],
    ['Low', 'Poor', 'Weak', 'Low', 0.05, 0.95],
]

combinations = list(zip(*[[row[i] for row in job_sat_table] for i in range(4)]))
probs_high = [row[4] for row in job_sat_table]
probs_low = [row[5] for row in job_sat_table]

cpd_js = TabularCPD(
    'JobSatisfaction', 2, [probs_high, probs_low],
    evidence=['Salary', 'WorkLifeBalance', 'InterestFit', 'GrowthPotential'],
    evidence_card=[3, 2, 2, 2],
    state_names={
        'JobSatisfaction': ['High', 'Low'],
        'Salary': ['High', 'Medium', 'Low'],
        'WorkLifeBalance': ['Good', 'Poor'],
        'InterestFit': ['Strong', 'Weak'],
        'GrowthPotential': ['High', 'Low']
    }
)

model.add_cpds(cpd_salary, cpd_interest, cpd_rep, cpd_culture, cpd_growth, cpd_wlb, cpd_js)
model.check_model()
infer = VariableElimination(model)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    evidence = {}

    if data.get('salary'):
        evidence['Salary'] = data['salary']
    if data.get('interestFit'):
        evidence['InterestFit'] = data['interestFit']
    if data.get('companyCulture'):
        evidence['CompanyCulture'] = data['companyCulture']
    if data.get('companyReputation'):
        evidence['CompanyReputation'] = data['companyReputation']
    if data.get('workLifeBalance'):
        evidence['WorkLifeBalance'] = data['workLifeBalance']
    if data.get('growthPotential'):
        evidence['GrowthPotential'] = data['growthPotential']

    try:
        query = infer.query(variables=['JobSatisfaction'], evidence=evidence)
        result = query.values.tolist()
        return jsonify({
            'High': round(result[0] * 100, 2),
            'Low': round(result[1] * 100, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
