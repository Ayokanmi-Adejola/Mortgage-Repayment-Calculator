document.addEventListener('DOMContentLoaded', () => {
  const mortgageForm = document.getElementById('mortgage-form');
  const clearButton = document.querySelector('.clear-btn');
  const emptyResults = document.getElementById('empty-results');
  const completedResults = document.getElementById('completed-results');
  const monthlyRepaymentElement = document.getElementById('monthly-repayment');
  const totalRepaymentElement = document.getElementById('total-repayment');

  // Clear form and reset results
  clearButton.addEventListener('click', () => {
    mortgageForm.reset();
    showEmptyResults();
    clearErrors();
  });

  // Form submission
  mortgageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    const isValid = validateForm();
    
    if (isValid) {
      calculateMortgage();
    }
  });

  // Validate form inputs
  function validateForm() {
    const mortgageAmount = document.getElementById('mortgage-amount').value;
    const mortgageTerm = document.getElementById('mortgage-term').value;
    const interestRate = document.getElementById('interest-rate').value;
    
    let isValid = true;
    
    if (!mortgageAmount || mortgageAmount <= 0) {
      showError('mortgage-amount', 'Please enter a valid mortgage amount');
      isValid = false;
    }
    
    if (!mortgageTerm || mortgageTerm <= 0) {
      showError('mortgage-term', 'Please enter a valid mortgage term');
      isValid = false;
    }
    
    if (!interestRate || interestRate < 0) {
      showError('interest-rate', 'Please enter a valid interest rate');
      isValid = false;
    }
    
    return isValid;
  }

  // Show error message for an input
  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const formGroup = input.closest('.form-group');
    
    formGroup.classList.add('error');
    
    const errorElement = document.createElement('p');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
  }

  // Clear all error messages
  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
  }

  // Calculate mortgage repayments
  function calculateMortgage() {
    const mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value);
    const mortgageTerm = parseFloat(document.getElementById('mortgage-term').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked').value;
    
    let monthlyRepayment = 0;
    let totalRepayment = 0;
    
    if (mortgageType === 'repayment') {
      // Calculate repayment mortgage
      const monthlyRate = interestRate / 12;
      const numberOfPayments = mortgageTerm * 12;
      
      if (interestRate === 0) {
        // Simple division if interest rate is zero
        monthlyRepayment = mortgageAmount / numberOfPayments;
      } else {
        // Standard formula for calculating monthly mortgage payments
        monthlyRepayment = mortgageAmount * 
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }
      
      totalRepayment = monthlyRepayment * numberOfPayments;
    } else {
      // Calculate interest-only mortgage
      monthlyRepayment = mortgageAmount * (interestRate / 12);
      totalRepayment = (monthlyRepayment * mortgageTerm * 12) + mortgageAmount;
    }
    
    // Display results
    monthlyRepaymentElement.textContent = `£${monthlyRepayment.toFixed(2)}`;
    totalRepaymentElement.textContent = `£${totalRepayment.toFixed(2)}`;
    
    showCompletedResults();
  }

  // Show empty results section
  function showEmptyResults() {
    emptyResults.classList.remove('hidden');
    completedResults.classList.add('hidden');
  }

  // Show completed results section
  function showCompletedResults() {
    emptyResults.classList.add('hidden');
    completedResults.classList.remove('hidden');
  }
});