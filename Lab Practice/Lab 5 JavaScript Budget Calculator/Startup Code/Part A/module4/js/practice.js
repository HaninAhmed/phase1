/* =================================
   Module 4: DOM Selection & Manipulation
   Open module4/practice.html in the browser
   ================================= */

// ---- Exercise 0: Link this JS file to your HTML ----
// Open practice.html and add a <script> tag at the bottom of <body> to load this file.
// Then refresh the browser. If you see this in the console, it worked!
console.log("Module 4 JS loaded!");


const formatCurrency = (amount) => amount.toLocaleString() + " QAR";
const calcSavingsRate = (income, expenses) => ((income - expenses) / income * 100).toFixed(1);

// ---- Exercise 1: Select and Read Elements ----

// 1a. Use getElementById to select the elements with IDs:
//     "balance-display", "income-display", "expenses-display"


// 1b. Log the textContent of each one


// 1c. Use querySelector to select the first element with class "card" and log its h3 text


// 1d. Use querySelectorAll to select ALL elements with class "amount" and log how many there are



// ---- Exercise 2: Modify Elements ----

// 2a. Change the balance display's textContent to "50,000"


// 2b. Add the CSS class "text-success" to the balance element using classList.add()


// 2c. Change the background color of the element with ID "output2" using .style



// ---- Exercise 3: Create New Elements ----

// 3a. Use document.createElement("div") to create a new card element


// 3b. Set its className to "card"


// 3c. Set its innerHTML to show a "Savings Rate" card
//     (use calcSavingsRate with 12000 income and 8500 expenses)


// 3d. Append it to the element with ID "new-cards" using appendChild()

