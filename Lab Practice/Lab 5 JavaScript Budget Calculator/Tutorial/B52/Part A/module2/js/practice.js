/* =================================
   Module 2: Functions & Calculations
   Run: node js/practice.js
   ================================= */

// ---- Exercise 1: Function Declarations ----

// 1a. Write a function formatCurrency(amount) that returns a string like "15,250 QAR"
//     Hint: use amount.toLocaleString()

function formatCurrency(amount) {
   // return `${amount} QAR`
   return amount.toLocaleString() + " QAR"
}
const formatCurrency2 = amount => amount.toLocaleString() + " QAR"

console.log(formatCurrency(15000));

// 1b. Write a function calculateRemaining(income, expenses) that returns the difference

function calculateRemaining(income, expenses) {
   return income - expenses
}

console.log(calculateRemaining(12000, 8500));


// 1c. Test both:
//     formatCurrency(15250)              → "15,250 QAR"
//     calculateRemaining(12000, 8500)    → 3500



// ---- Exercise 2: Arrow Functions ----

// 2a. Rewrite formatCurrency as a one-line arrow function called formatCurrencyArrow

function add(a, b) {
   return a + b
}
(a, b) => a + b
function isEven(a) {
   return a % 2 == 0
}
a => a % 2 == 0

function isOddEven(a) {
   if (a % 2 == 0)
      return "Even"
   return "Odd"
}
// want to convert this function into an arrow function 

const isEvenOrOdd = a => a % 2 == 0 ? "Even" : "Odd"
console.log(isEvenOrOdd(12));


// 2b. Write an arrow function calcSavingsRate(income, expenses) that returns
//     the savings rate as a string with 1 decimal place
//     Formula: ((income - expenses) / income) * 100
//     Hint: use .toFixed(1)


// 2c. Test: calcSavingsRate(12000, 8500) → "29.2"



// ---- Exercise 3: Processing an Array ----

const monthlyExpenses = [4500, 1200, 650, 320, 750, 380];
const income = 12000;

// 3a. Write a function calculateTotal(items) that returns the sum of all items


// 3b. Use calculateTotal to get the total expenses and log it


// 3c. Calculate and log the remaining balance (income - total expenses)


// 3d. Calculate and log the savings rate using your calcSavingsRate function
// function display(a) {
//    console.log(a);

// }
const display = a => console.log(a)
const display2 = a => console.log(`The value is ${a}`)
function display3(a) {
   return `This is the last display ${a}`
}

function addAndDisplay(a, b, callback) {
   sum = a + b;
   callback(sum)
}

const x = 10
const y = 20

addAndDisplay(x, y, display)
addAndDisplay(x, y, display3)
addAndDisplay(10, 20, a => console.log(`The value is ${a}`))
addAndDisplay(10, 20, function (a) {
   return `This is the last display ${a}`
})