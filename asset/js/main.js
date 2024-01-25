// Get the element with id 'previous'
let previous = document.getElementById('previous');
// Get the element with id 'current'
let current = document.getElementById('current');
// Get the element with class 'clear'
let clear = document.querySelector('.clear');
// Get the element with class 'cancel'
let cancel = document.querySelector('.cancel');
// Get all elements with class 'number'
let numbers = document.querySelectorAll('.number');
// Get all elements with class 'operator'
let operators = document.querySelectorAll('.operator');
// Get the element with class 'equal'
let equal = document.querySelector('.equal');

// Add event listeners to each number element
numbers.forEach(number => {
  number.addEventListener('click', () => {
    let currentSelection = number.getAttribute('number');
    if (current.textContent == 0) {
      current.textContent = currentSelection;
    } else {
      current.textContent += currentSelection;
    }
  });
});

// Add event listeners to each operator element
operators.forEach(operator =>  {
  operator.addEventListener('click', () => {
    let currentOperator = operator.getAttribute('operator');
    let updateOperator = previous.textContent.split(' ');
    if (!previous.textContent) {
      current.textContent = `${current.textContent} ${currentOperator}`;
      previous.textContent = current.textContent;
      current.textContent = '';
      return;
    };
    updateOperator.pop();
    updateOperator.push(currentOperator);
    previous.textContent = updateOperator.join(' ');
  });
});

// Define arithmetic functions
const add = (a, b) => a + b;
const minus = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Perform calculation based on the operator
const calculate = () => {
  let currentCalculation = previous.textContent.split(' ');
  switch (currentCalculation[1]) {
    case '+':
      current.textContent = add(Number(currentCalculation[0]), Number(current.textContent));
      break;
    case '-':
      current.textContent = minus(Number(currentCalculation[0]), Number(current.textContent));
      break;
    case 'x':
      current.textContent = multiply(Number(currentCalculation[0]), Number(current.textContent));
      break;
    case '/':
      current.textContent = divide(Number(currentCalculation[0]), Number(current.textContent));
      break;
  };
  previous.textContent = '';
};

// Clear all input fields
const clearAll = () => {
  previous.textContent = '';
  current.textContent = 0;
};

// Clear the current input field
const clearCurrent = () => {
  if (!current.textContent) {
    current.textContent = previous.textContent;
    previous.textContent = '';
  };
  let currentValue = current.textContent.split('');
  currentValue.pop();
  current.textContent = currentValue.join('').trim();
  // If there's nothing to clear, set current.textContent to '0'
  if (!current.textContent) {
    current.textContent = 0;
  };
};

// Add event listeners to the equal, clear, and cancel buttons
equal.addEventListener('click', calculate);
clear.addEventListener('click', clearCurrent);
cancel.addEventListener('click', clearAll);

// Set the initial value of the current input field to 0 when the window loads
window.onload = () => {
  current.textContent = 0;
};