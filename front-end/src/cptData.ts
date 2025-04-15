// src/data/cptData.ts
export const CPTs = {
    Salary: {
      High: 0.2,
      Medium: 0.5,
      Low: 0.3,
    },
    InterestFit: {
      Strong: 0.3,
      Weak: 0.7,
    },
    CompanyReputation: {
      High: 0.9,
      Low: 0.1,
    },
    CompanyCulture: {
      Supportive: 0.8,
      Toxic: 0.2,
    },
    GrowthPotential: {
      High: {
        CompanyReputationisHigh: 0.9,
        CompanyReputationisLow: 0.5,
      },
      Low: {
        CompanyReputationisHigh: 0.1,
        CompanyReputationisLow: 0.5,
      },
    },
    WorkLifeBalance: {
      Good: {
        CompanyCultureisSupportive: 0.9,
        CompanyCultureisToxic: 0.2,
      },
      Poor: {
        CompanyCultureisSupportive: 0.1,
        CompanyCultureisToxic: 0.8,
      },
    },
    JobSatisfaction: [
      { salary: 'High', workLifeBalance: 'Good', interestFit: 'Strong', growthPotential: 'High', High: 0.95, Low: 0.05 },
      { salary: 'High', workLifeBalance: 'Good', interestFit: 'Strong', growthPotential: 'Low', High: 0.9, Low: 0.1 },
      { salary: 'High', workLifeBalance: 'Good', interestFit: 'Weak', growthPotential: 'High', High: 0.75, Low: 0.25 },
      { salary: 'High', workLifeBalance: 'Good', interestFit: 'Weak', growthPotential: 'Low', High: 0.6, Low: 0.4 },
      { salary: 'High', workLifeBalance: 'Poor', interestFit: 'Strong', growthPotential: 'High', High: 0.8, Low: 0.2 },
      { salary: 'High', workLifeBalance: 'Poor', interestFit: 'Strong', growthPotential: 'Low', High: 0.5, Low: 0.5 },
      { salary: 'High', workLifeBalance: 'Poor', interestFit: 'Weak', growthPotential: 'High', High: 0.5, Low: 0.5 },
      { salary: 'High', workLifeBalance: 'Poor', interestFit: 'Weak', growthPotential: 'Low', High: 0.3, Low: 0.7 },
      { salary: 'Medium', workLifeBalance: 'Good', interestFit: 'Strong', growthPotential: 'High', High: 0.85, Low: 0.15 },
      { salary: 'Medium', workLifeBalance: 'Good', interestFit: 'Strong', growthPotential: 'Low', High: 0.8, Low: 0.2 },
      { salary: 'Medium', workLifeBalance: 'Good', interestFit: 'Weak', growthPotential: 'High', High: 0.65, Low: 0.35 },
      { salary: 'Medium', workLifeBalance: 'Good', interestFit: 'Weak', growthPotential: 'Low', High: 0.5, Low: 0.5 },
      { salary: 'Medium', workLifeBalance: 'Poor', interestFit: 'Strong', growthPotential: 'High', High: 0.7, Low: 0.3 },
      { salary: 'Medium', workLifeBalance: 'Poor', interestFit: 'Strong', growthPotential: 'Low', High: 0.5, Low: 0.5 },
      { salary: 'Medium', workLifeBalance: 'Poor', interestFit: 'Weak', growthPotential: 'High', High: 0.45, Low: 0.55 },
      { salary: 'Medium', workLifeBalance: 'Poor', interestFit: 'Weak', growthPotential: 'Low', High: 0.2, Low: 0.8 },
      { salary: 'Low', workLifeBalance: 'Good', interestFit: 'Strong', growthPotential: 'High', High: 0.6, Low: 0.4 },
      { salary: 'Low', workLifeBalance: 'Good', interestFit: 'Strong', growthPotential: 'Low', High: 0.55, Low: 0.45 },
      { salary: 'Low', workLifeBalance: 'Good', interestFit: 'Weak', growthPotential: 'High', High: 0.4, Low: 0.6 },
      { salary: 'Low', workLifeBalance: 'Good', interestFit: 'Weak', growthPotential: 'Low', High: 0.25, Low: 0.75 },
      { salary: 'Low', workLifeBalance: 'Poor', interestFit: 'Strong', growthPotential: 'High', High: 0.45, Low: 0.55 },
      { salary: 'Low', workLifeBalance: 'Poor', interestFit: 'Strong', growthPotential: 'Low', High: 0.25, Low: 0.75 },
      { salary: 'Low', workLifeBalance: 'Poor', interestFit: 'Weak', growthPotential: 'High', High: 0.15, Low: 0.85 },
      { salary: 'Low', workLifeBalance: 'Poor', interestFit: 'Weak', growthPotential: 'Low', High: 0.05, Low: 0.95 },
    ],
  };
  