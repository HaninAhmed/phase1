/* =================================
   Module 5: Event Listeners
   Open module5/practice.html in the browser
   ================================= */

const formatCurrency = (amount) => amount.toLocaleString() + " QAR";

// ---- Exercise 1: Button Click Events ----

let currentBalance = 0;

// 1a. Add a click event listener to #add-income-btn
//     When clicked: add 1000 to currentBalance, update #running-balance display


// 1b. Add a click event listener to #add-expense-btn
//     When clicked: subtract 500 from currentBalance, update #running-balance display


// 1c. Add a click event listener to #reset-btn
//     When clicked: reset currentBalance to 0, update #running-balance display



// ---- Exercise 2: Input Events ----

// 2a. Add an "input" event listener to #amount-input
//     When the user types, update #amount-preview with the formatted value
//     Hint: use event.target.value to read the current input



// ---- Exercise 3: Form Submit ----

const transactions = [];

// 3a. Add a "submit" event listener to #transaction-form that:
//     - Prevents the default page reload
//     - Reads values from #desc-input, #form-amount, and #type-select
//     - Creates a transaction object { description, amount, type }
//     - Pushes it to the transactions array
//     - Displays all transactions in #output3
//     - Resets the form

