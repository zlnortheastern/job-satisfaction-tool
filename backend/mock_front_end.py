import requests

url = "http://127.0.0.1:5000/predict"
data = {
    "salary": "High",
    "interestFit": "Strong",
    "companyCulture": "Supportive",
    "companyReputation": "High",
    "workLifeBalance": "Good",
    "growthPotential": "High"
}

response = requests.post(url, json=data)
print(response.json())
