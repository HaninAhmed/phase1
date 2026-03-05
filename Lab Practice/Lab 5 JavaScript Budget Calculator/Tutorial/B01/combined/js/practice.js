/* ==========================================================
   Combined: All Modules 1-6
   Modules 1-3: run with node (console output)
   Modules 4-6: open combined/practice.html in the browser
   ========================================================== */


/* =================================
   Module 1: Variables & Data Types
   ================================= */

// ---- Exercise 1-1: Declaring Variables ----
// Declare accountName (const), balance (let), isActive (const)
// Log all three to the console


// ---- Exercise 1-2: Working with Objects ----
// Create a transaction object with: description, amount, category, type
// Log the object and individual properties


// ---- Exercise 1-3: Template Literals ----
// Create a formatted string using template literals showing the transaction
// Create a multi-line receipt string


/* =================================
   Module 2: Functions & Calculations
   ================================= */

// ---- Exercise 2-1: Function Declarations ----
// Write formatCurrency(amount) → "X,XXX QAR"
// Write calculateRemaining(income, expenses) → difference
// Test both


// ---- Exercise 2-2: Arrow Functions ----
// Rewrite formatCurrency as an arrow function
// Write calcSavingsRate(income, expenses) → savings percentage with 1 decimal
// Test both


// ---- Exercise 2-3: Processing an Array ----
const monthlyExpenses = [4500, 1200, 650, 320, 750, 380];
const monthlyIncome = 12000;
// Write calculateTotal(items) that sums the array
// Log total expenses, remaining balance, and savings rate


/* =================================
   Module 3: Arrays & Array Methods
   ================================= */

const transactions = [
    { description: "Salary", amount: 12000, type: "income", category: "Income" },
    { description: "Rent", amount: 4500, type: "expense", category: "Housing" },
    { description: "Groceries", amount: 1200, type: "expense", category: "Food" },
    { description: "Bus Pass", amount: 650, type: "expense", category: "Transportation" },
    { description: "Electric Bill", amount: 320, type: "expense", category: "Utilities" },
    { description: "Movie Tickets", amount: 150, type: "expense", category: "Entertainment" },
    { description: "Freelance Work", amount: 3000, type: "income", category: "Income" },
    { description: "Restaurant", amount: 200, type: "expense", category: "Food" },
    { description: "Gas", amount: 250, type: "expense", category: "Transportation" },
    { description: "New Shoes", amount: 380, type: "expense", category: "Shopping" }
];

// ---- Exercise 3-1: filter and map ----
// Filter expenses and income separately, log counts
// Map to description strings, map to formatted amount strings


// ---- Exercise 3-2: reduce ----
// Calculate total income, total expenses, and balance using filter + reduce


// ---- Exercise 3-3: Method Chaining ----
// Group expenses by category using filter + reduce into an object
// Display each category and its total


/* =================================
   Module 4: DOM Selection & Manipulation
   (open practice.html in browser from here)
   ================================= */

// ---- Exercise 4-0: Link this JS file to your HTML ----
// Open practice.html and add a <script> tag at the bottom of <body> to load this file.
// Then refresh the browser. If you see this in the console, it worked!
console.log("Combined JS loaded!");


// ---- Exercise 4-1: Select and Read Elements ----
// Select #m4-balance-display, #m4-income-display, #m4-expenses-display by ID
// Select the first .card with querySelector
// Select all .amount elements with querySelectorAll and log the count


// ---- Exercise 4-2: Modify Elements ----
// Change the balance display text to "50,000"
// Add "text-success" class to the balance element
// Change the background color of #m4-output2


// ---- Exercise 4-3: Create New Elements ----
// Create a new card div for "Savings Rate", set its innerHTML, append to #m4-new-cards


/* =================================
   Module 5: Event Listeners
   ================================= */

let currentBalance = 0;

// ---- Exercise 5-1: Button Click Events ----
// #m5-add-income-btn → add 1000 to currentBalance, update #m5-running-balance
// #m5-add-expense-btn → subtract 500, update display
// #m5-reset-btn → reset to 0, update display


// ---- Exercise 5-2: Input Events ----
// Add "input" listener to #m5-amount-input, update #m5-amount-preview with formatted value


// ---- Exercise 5-3: Form Submit ----
const m5Transactions = [];
// Add "submit" listener to #m5-transaction-form:
//   preventDefault, read inputs, push to array, display in #m5-output3, reset form


/* =================================
   Module 6: Mini Budget Calculator
   ================================= */

const m6Transactions = [];

// ---- Step 6-1: updateDashboard() ----
// Calculate totals using filter + reduce, update #m6-total-income, #m6-total-expenses,
// #m6-total-balance, #m6-transaction-count. Change balance color.


// ---- Step 6-2: renderTransactions() ----
// Display all transactions in #m6-transaction-list
// Show empty message if no transactions


// ---- Step 6-3: Form Submit ----
// Add submit listener to #m6-calc-form, read inputs, push to array, update display


// ---- Step 6-4: Clear All ----
// Add click listener to #m6-clear-all-btn, empty array, update display

