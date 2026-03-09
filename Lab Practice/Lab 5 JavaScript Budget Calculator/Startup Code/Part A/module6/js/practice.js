/* =================================
   Module 6: Mini Budget Calculator
   Open module6/practice.html in the browser
   ================================= */

const formatCurrency = (amount) => amount.toLocaleString() + " QAR";

const transactions = [];

// ---- Step 1: updateDashboard() ----

// Write a function that:
//   - Calculates total income (filter income transactions, then reduce to sum)
//   - Calculates total expenses (filter expense transactions, then reduce to sum)
//   - Calculates balance
//   - Updates: #total-income, #total-expenses, #total-balance, #transaction-count
//   - Changes balance color: "text-success" if positive, "text-danger" if negative



// ---- Step 2: renderTransactions() ----

// Write a function that:
//   - Gets #transaction-list
//   - If transactions is empty, show "No transactions yet"
//   - Otherwise, build HTML for each transaction (description, category, amount)
//   - Green for income, red for expenses



// ---- Step 3: Form Submit Listener ----

// Add "submit" listener to #calc-form:
//   - Prevent default
//   - Read #calc-desc, #calc-amount, #calc-type, #calc-category
//   - Push new object to transactions
//   - Call updateDashboard() and renderTransactions()
//   - Reset the form



// ---- Step 4: Clear All Button ----

// Add "click" listener to #clear-all-btn:
//   - Empty the transactions array
//   - Call updateDashboard() and renderTransactions()

