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

1 == "1" //true
1 === "1" //false

// expenses = []
// for (const trans of transactions) {
//     if (trans.type === "expense") {
//         expenses.push(trans)
//     }
// }

// console.log(expenses);

console.log(transactions.filter(trans => trans.type === "expense"));

// function myFilter(trans) {
//     return trans.type === "expense"
// }

const one = transactions.find(a => a.type === "expense");
console.log(one);

// 1b. Use .filter() to create an array of only the income transactions. Log the count.


// // 1c. Use .map() to create an array of just the description strings. Log it.

// console.log(transactions.map(t => `
//         <tr>
//             <td> ${t.description} </td>
//             <td> ${t.amount} </td>
//             <td> ${t.category} </td>
//             <td> ${t.category} </td>
//         </tr>

//     `));


transactions.forEach(a => console.log(a.category));



// 1d. Use .map() to create formatted strings like "+12,000 QAR" or "-4,500 QAR". Log it.



// ---- Exercise 2: reduce ----

// 2a. Use .filter() + .reduce() to calculate total income. Log it.

const incomes = transactions.filter(a => a.type === "income")

incomes.reduce((acc, curr) => acc + curr.amount, 0)
// acc 0 , curr {description: "Salary", amount: 12000, type: "income", category: "Income"}
// acc 12000 , curr {description: "Freelance Work", amount: 3000, type: "income", category: "Income"}
// acc 15000 , curr undefined


// 2b. Use .filter() + .reduce() to calculate total expenses. Log it.


// 2c. Calculate and log the balance (income - expenses).



// ---- Exercise 3: Method Chaining ----

// 3a. Use .filter() and .reduce() to group expenses by category into an object.
//     Expected: { Housing: 4500, Food: 1400, Transportation: 900, ... }


// 3b. Use Object.entries() and .map() to log each category with its total.



// const numbers = [1, 2, 3, 4, 5, 6, -1, - 2]

// function isEven(a) {
//     return a % 2 == 0;
// }

// // const evens = numbers.filter(a => a % 2 == 0)
// // const evens = numbers.filter(isEven)
// const evens = numbers.filter(function isEven(a) {
//     return a % 2 == 0;
// })

// const negs = numbers.filter(a => a < 0)
// console.log(evens);
// console.log(negs);


// const numbers = [1, 2, 3, 4, 5]

// f = (acc, curr) => acc + curr
// initial = 0

// // numbers.reduce(f , initial)
// const total = numbers.reduce((acc, curr) => acc * curr, 1);
// console.log("total ", total);
