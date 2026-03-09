/* =================================
   Module 1: Variables & Data Types
   Run: node js/practice.js
   ================================= */

// ---- Exercise 1: Declaring Variables ----

// 1a. Declare a constant called accountName and set it to "Main Checking"
let accountName = "Checking Account"

const openYear = 2026
const isActive = true
const transactions = [200, 400, 100, 4000, [2, 3, 4, 5], "Abdulahi", { name: "Moahmed" }]

accountName = "Saving Account"
console.log(accountName);

transactions.push(14)
transactions.pop()
transactions.shift()
transactions.unshift(18)
transactions.splice(1, 2)

// transactions.filter()
// transactions.fine()
// transactions.forEach()
// transactions.reduce()
// transactions.map()
// 900.00.toFixed(0)

// console.log(transactions)

// console.table(transactions)
// 1b. Declare a variable (let) called balance and set it to 15250


// 1c. Declare a constant called isActive and set it to true


// 1d. Log all three to the console



// ---- Exercise 2: Working with Objects ----

// 2a. Create a transaction object with these properties:
//     description: "Grocery Shopping", amount: 850, category: "Food", type: "expense"






// 2b. Log the full object to the console


// 2c. Log just the description and amount individually using dot notation



// ---- Exercise 3: Template Literals ----

// 3a. Using your transaction object, create a formatted string with template literals:
//     "Grocery Shopping: 850 QAR (expense)"
const transaction = {
   description: "Grocery Shopping",
   amount: 850,
   category: "Food",
   type: "expense"
}
// console.log(transaction.category);
// template literal
console.log(`
      The Transaction is : 
      ${transaction.description}: ${transaction.amount} QAR (${transaction.type})  
   `);

console.log(`The category is ${transaction.category}`);
console.log("The category is", transaction.category);

// `
//    <table>
//       <tr>
//          <td> ${transaction.amount}
//       </tr>
//    </table>


// `




// 3b. Create a multi-line receipt string that displays all properties of the transaction


// 3c. Log both strings to the console

for (const tran in transactions) {
   console.log(tran)
}

// for (let i = 0; i < 100; i++) {

// }

// if(x){

// }else if (y){

// }else{

// }