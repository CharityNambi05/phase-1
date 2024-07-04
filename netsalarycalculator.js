const r3 = require('prompt-sync')({ sigint: true }); // Graceful exit on Ctrl+C

function calculateNetSalary() {
  // KRA Tax Brackets (2024 - income year 2023) - Replace with latest values if needed
  const taxBrackets = [
    { min: 0, max: 1815408, rate: 0 },
    { min: 1815409, max: 2410523, rate: 0.1 },
    { min: 2410524, max: 3005639, rate: 0.25 },
    { min: 3005640, max: unbounded, rate: 0.3 }
  ];

  // NHIF Contribution Rates (2024) - Replace with latest values if needed
  const nhifRates = [
    { min: 0, max: 5999, rate: 150 },
    { min: 6000, max: 7999, rate: 300 },
    { min: 8000, max: 9999, rate: 450 },
    { min: 10000, max: unbounded, rate: 600 }
  ];

  // NSSF Contribution Rates (2024) - Replace with latest values if needed
  const nssfRates = { employee: 0.06, employer: 0.12 }; // Percentages

  // Get user input
  const basicSalary = parseFloat(prompt("Enter basic salary (KES): "));
  const benefits = parseFloat(prompt("Enter benefits (KES): "));

  // Error handling for invalid input
  if (isNaN(basicSalary) || isNaN(benefits)) {
    console.error("Invalid input. Please enter numerical values.");
    return;
  }

  // Calculate gross salary
  const grossSalary = basicSalary + benefits;

  // Calculate NHIF deduction
  let nhifDeduction = 0;
  for (const bracket of nhifRates) {
    if (grossSalary <= bracket.max) {
      nhifDeduction = bracket.rate;
      break;
    }
  }

  // Calculate NSSF deduction (combined employee and employer contributions)
  const nssfDeduction = (grossSalary * nssfRates.employee) + (grossSalary * nssfRates.employer);

  // Calculate PAYE (Tax)
  let taxableIncome = grossSalary;
  let payee = 0;
  for (const bracket of taxBrackets) {
    if (taxableIncome <= bracket.max) {
      payee += (taxableIncome - bracket.min) * bracket.rate;
      break;
    } else {
      payee += (bracket.max - bracket.min) * bracket.rate;
      taxableIncome = bracket.max;
    }
  }

  // Calculate net salary
  const netSalary = grossSalary - payee - nhifDeduction - nssfDeduction;

  // Print results with clear formatting
  console.log("\nSalary Breakdown (KES):");
  console.log(`  Basic Salary:  ${basicSalary.toFixed(2)}`);
  console.log(`  Benefits:     ${benefits.toFixed(2)}`);
  console.log(`  Gross Salary:  ${grossSalary.toFixed(2)}`);
  console.log(`  NHIF Deduction: -${nhifDeduction.toFixed(2)}`);
  console.log(`  NSSF Deduction: -${nssfDeduction.toFixed(2)}`);
  console.log(`  PAYE (Tax):     -${payee.toFixed(2)}`);
  console.log(`\n  Net Salary:    ${netSalary.toFixed(2)}`);
}

calculateNetSalary();
