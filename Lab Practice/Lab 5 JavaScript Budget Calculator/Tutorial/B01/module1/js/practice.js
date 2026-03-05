/* =================================
   Module 1: Variables & Data Types
   Run: node js/practice.js
   ================================= */

// ---- Exercise 1: Declaring Variables ----

// 1a. Declare a constant called accountName and set it to "Main Checking"

const accountName = "Main Checking";
console.log(accountName);
console.table([1, 2, 3, , 45, 5])

// 1b. Declare a variable (let) called balance and set it to 15250
let balance = 15200
balance += 1000

console.log(balance);



// 1c. Declare a constant called isActive and set it to true

const isActive = true
const list = [
   1, 2, 3, "Writing stuff", [[123], [2, 3, 4]]
]


// 1d. Log all three to the console



// ---- Exercise 2: Working with Objects ----

// 2a. Create a transaction object with these properties:
//     description: "Grocery Shopping", amount: 850, category: "Food", type: "expense"

const transactions = {
   account: "12000",
   amount: 1500,
   category: "Food",
   type: "expense",
   toString: function () {
      return `${this.account}: ${this.amount} QAR (${this.type})`;
   }
}

console.log(transactions);

console.log(transactions.account);
console.log(transactions.toString());




// 2b. Log the full object to the console


// 2c. Log just the description and amount individually using dot notation



// ---- Exercise 3: Template Literals ----

// 3a. Using your transaction object, create a formatted string with template literals:
//     "Grocery Shopping: 850 QAR (expense)"

let x = 200
console.log(`
   long long long string
   also you can mix variables with text ${x}
`)

console.log(`
   
   Account : ${transactions.account}
   Category : ${transactions.category}
   `);





// 3b. Create a multi-line receipt string that displays all properties of the transaction


// 3c. Log both strings to the console

