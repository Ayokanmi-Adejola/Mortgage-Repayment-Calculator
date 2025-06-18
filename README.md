# Frontend Mentor - Mortgage repayment calculator solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects.


## Overview

### The challenge

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./design/desktop-design-completed.jpg)


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

This project helped me strengthen my understanding of form validation and responsive design. I learned how to create a functional mortgage calculator that handles different types of mortgage calculations (repayment and interest-only).

Some key code snippets I'm proud of:

```html
<div class="form-group">
  <p>Mortgage Type</p>
  <div class="radio-group">
    <div class="radio-option">
      <input type="radio" id="repayment" name="mortgage-type" value="repayment" checked>
      <label for="repayment">Repayment</label>
    </div>
    <div class="radio-option">
      <input type="radio" id="interest-only" name="mortgage-type" value="interest-only">
      <label for="interest-only">Interest Only</label>
    </div>
  </div>
</div>
```

```css
.calculator-content {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .calculator-content {
    flex-direction: row;
    gap: 2rem;
  }
}
```

```js
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
}
```

### Continued development

In future projects, I would like to focus on:

- Implementing more advanced form validation techniques
- Adding more interactive elements and animations
- Exploring JavaScript frameworks to enhance functionality
- Implementing data persistence using local storage
- Adding more detailed mortgage calculation options (like overpayments)

### Useful resources

- [MDN Web Docs](https://developer.mozilla.org) - This helped me understand the mortgage calculation formulas and JavaScript DOM manipulation.
- [CSS-Tricks](https://css-tricks.com) - Great resource for flexbox and grid layouts which I used extensively in this project.
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - This helped me with the responsive layout.

## Author

- Frontend Mentor - [@Ayokanmi-Adejola](https://www.frontendmentor.io/profile/Ayokanmi-Adejola)
