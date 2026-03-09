/* =================================
   MyFinance Budget Calculator
   ================================= */

// ---- Step 1: Helper Functions ----
// Create two arrow functions:
//   formatCurrency(amount) → returns "X,XXX QAR" (use .toLocaleString())
//   calcSavingsRate(income, expenses) → returns savings rate with 1 decimal (handle income === 0)


// ---- Step 2: Data Storage ----
// Create an empty array to store transaction objects


// ---- Step 3: updateDashboard() ----
// Write a function that calculates totals from the transactions array and updates the page:
//   - Total income (filter income transactions, then reduce to sum)
//   - Total expenses (filter expense transactions, then reduce to sum)
//   - Balance (income - expenses)
//   - Savings rate
// Update these elements: #total-income, #total-expenses, #total-balance, #savings-rate
// Change balance color based on positive/negative


// ---- Step 4: renderTransactions() ----
// Write a function that displays all transactions in the #transaction-body table:
//   - If empty, show a "No transactions yet" message
//   - Otherwise, create a table row for each transaction
//   - Show description, type, and formatted amount
//   - Use green for income, red for expenses


// ---- Step 5: Form Submit Listener ----
// Add a "submit" event listener to #quick-transaction-form:
//   - Prevent default
//   - Read values from #quick-desc, #quick-amount, #quick-type
//   - Push new transaction object to the array
//   - Call updateDashboard() and renderTransactions()
//   - Reset the form


// ---- Step 6: Clear Button ----
// Add a "click" event listener to #clear-btn:
//   - Empty the transactions array
//   - Call updateDashboard() and renderTransactions()

