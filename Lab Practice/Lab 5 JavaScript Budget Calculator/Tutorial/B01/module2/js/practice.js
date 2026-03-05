/* =================================
   Module 2: Functions & Calculations
   Run: node js/practice.js
   ================================= */

// ---- Exercise 1: Function Declarations ----

// 1a. Write a function formatCurrency(amount) that returns a string like "15,250 QAR"
//     Hint: use amount.toLocaleString()

console.log("Hello")
console.log("Another line")



function formatCurrency(amount) {
   return `${amount} QAR`;
}

console.log(formatCurrency(15200));


// 1b. Write a function calculateRemaining(income, expenses) that returns the difference
function calculateRemaining(income, expenses) {
   return income - expenses;
}

console.log(calculateRemaining(12000, 8500));


// 1c. Test both:
//     formatCurrency(15250)              → "15,250 QAR"
//     calculateRemaining(12000, 8500)    → 3500



// ---- Exercise 2: Arrow Functions ----

// 2a. Rewrite formatCurrency as a one-line arrow function called formatCurrencyArrow

function formatCurrency(amount) {
   return `${amount} QAR`;
}
function add(a, b) {
   return a + b;
}

const add2 = (a, b) => a + b

console.log("Add 1 ", add(2, 3));
console.log("Add 2 ", add2(2, 3));


const formatCurrency2 = (amount) => `${amount} QAR`;

formatCurrency2(15200);

console.log(123123.0000.toFixed(2));


// 2b. Write an arrow function calcSavingsRate(income, expenses) that returns
//     the savings rate as a string with 1 decimal place
//     Formula: ((income - expenses) / income) * 100
//     Hint: use .toFixed(1)

const calcSavingsRate = (income, expenses) => (((income - expenses) / income) * 100)
   .toFixed(1)
   .toLocaleString()

// 2c. Test: calcSavingsRate(12000, 8500) → "29.2"
console.log(calcSavingsRate(12000, 8500));



// ---- Exercise 3: Processing an Array ----

const monthlyExpenses = [4500, 1200, 650, 320, 750, 380];
const income = 12000;

// 3a. Write a function calculateTotal(items) that returns the sum of all items


// 3b. Use calculateTotal to get the total expenses and log it


// 3c. Calculate and log the remaining balance (income - total expenses)


// 3d. Calculate and log the savings rate using your calcSavingsRate function

function addAndDisplay(a, b, f) {
   let sum = a + b
   f(sum)
}

const display = (content) => console.log(`result is ${content}`);

function display2(content) {
   console.log(`result can be ${content}`);

}

x = 10
y = 20
addAndDisplay(x, y, (content) => console.log(`result is ${content}`))
// addAndDisplay(x, y, (content) => console.log(`result can be ${content}`))
addAndDisplay(10, 20, display2)