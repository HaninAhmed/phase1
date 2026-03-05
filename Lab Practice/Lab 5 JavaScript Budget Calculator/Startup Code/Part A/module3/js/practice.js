/* =================================
   Module 3: Arrays & Array Methods
   Run: node js/practice.js
   ================================= */

const formatCurrency = (amount) => amount.toLocaleString() + " QAR";

// Sample data - do not modify
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


// ---- Exercise 1: filter and map ----

// 1a. Use .filter() to create an array of only the expense transactions. Log the count.


// 1b. Use .filter() to create an array of only the income transactions. Log the count.


// 1c. Use .map() to create an array of just the description strings. Log it.


// 1d. Use .map() to create formatted strings like "+12,000 QAR" or "-4,500 QAR". Log it.



// ---- Exercise 2: reduce ----

// 2a. Use .filter() + .reduce() to calculate total income. Log it.


// 2b. Use .filter() + .reduce() to calculate total expenses. Log it.


// 2c. Calculate and log the balance (income - expenses).



// ---- Exercise 3: Method Chaining ----

// 3a. Use .filter() and .reduce() to group expenses by category into an object.
//     Expected: { Housing: 4500, Food: 1400, Transportation: 900, ... }


// 3b. Use Object.entries() and .map() to log each category with its total.

