import React, { useState } from 'react';

const Index = () => {
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [totalInterest, setTotalInterest] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    // get and convert input 
    const loanAmount = parseFloat(data.get('loanAmount'));
    const monthlyInterestRate = parseFloat(data.get('interestRate')) / 100 / 12;
    const loanTermInMonths = parseFloat(data.get('loanTerm')) * 12;

    // calculate monthly mortage payment
    const monthlyPaymentAmount = (loanAmount * monthlyInterestRate) / (1 - 1 / Math.pow(1 + monthlyInterestRate, loanTermInMonths));
    const totalPayment = monthlyPaymentAmount * loanTermInMonths;

    const currencyFormatter = new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD'
      },
    );


    setMonthlyPayment(
      currencyFormatter.format(monthlyPaymentAmount)
    );

    setTotalPayment(
      currencyFormatter.format(totalPayment)
    );

    setTotalInterest(
      currencyFormatter.format(totalPayment - loanAmount)
    );

  }
  return (
    <div>
      <form
        onSubmit={onSubmit}
      >
        <div>
          <label htmlFor="loanAmountInput">
            Loan Amount:
          </label>
          <input
            type="number"
            name="loanAmount"
            id="loanAmountInput"
            min="1"
            defaultValue="10000"
            required
          />
        </div>
        <div>
          <label htmlFor="loanTermInput">Loan Term (years):</label>
          <input
            type="number"
            name="loanTerm" 
            id="loanTermInput"
            min="1"
            defaultValue="30"
            required
          />
        </div>
        <div>
          <label htmlFor="interestRateInput">Interest Rate (%):</label>
          <input
            type="number"
            name="interestRate" 
            id="interestRateInput"
            min="0.01"
            defaultValue="3"
            step="0.01"
            required
          />
        </div>
        <div><button type="submit">Calculate</button></div>
      </form>

      <div>
        <div>
          Monthly Payment Amount:
          <strong>{monthlyPayment}</strong>
        </div>
        <div>
          Total Payment Amount:
          <strong>{totalPayment}</strong>
        </div>
        <div>
          Total Interest Paid:
          <strong>{totalInterest}</strong>
        </div>

      </div>
    </div>
  );
};

export default Index;