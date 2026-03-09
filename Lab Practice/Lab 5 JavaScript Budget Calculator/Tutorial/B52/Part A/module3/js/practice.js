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

// for each
function display(t) {
    console.log(`${t.description} : ${t.amount}`);
}
// transactions.forEach(display)
// transactions.forEach(t => console.log(`${t.description} : ${t.amount}`))


// ---- Exercise 1: filter and map ----

// 1a. Use .filter() to create an array of only the expense transactions. Log the count.
const expenses = transactions.filter(t => t.type === "expense")
const incomes = transactions.filter(t => t.type === "income")
console.log(`The total number of expenses is ${expenses.length}`);
console.log(`The total number of incomes is ${incomes.length}`);


// transactions.filter(t => t.type === "expense").forEach(t => console.log(t));

const singleTransaction = transactions.find(a => a.amount == 12000)
console.log(singleTransaction);


const numbers = [1, 2, 30, 40, 5, 6]
// const reduceFN = (acc, curr) => acc + curr
const max = numbers.reduce((acc, curr) => acc > curr ? acc : curr);
console.log(max);


// acc = 1, curr = 2 -> return 2
// acc = 2, curr = 30 -> return 30
// acc = 30, curr = 40 -> return 40
// acc = 40, curr = 5 -> return 40
// acc = 40, curr = 6 -> return 40

console.log(numbers);




//[10, 20, 30, 40, 50, 60] -> Mapping   t => t * 10

// const mappedTo10 = numbers.map(t => t * 3).filter(t => t % 2 != 0)
// console.log(mappedTo10);


// 1 == "1" is true
// 1 === "1" is false
// 1b. Use .filter() to create an array of only the income transactions. Log the count.


// 1c. Use .map() to create an array of just the description strings. Log it.

// const descriptions = transactions.map(t => t.description)
// console.log(descriptions);

// const options = descriptions.map(description => `<option> ${description} </option>`)
// console.log(options);


// console.log(`<select> ${options} </select>`);

// 1d. Use .map() to create formatted strings like "+12,000 QAR" or "-4,500 QAR". Log it.



// ---- Exercise 2: reduce ----

// 2a. Use .filter() + .reduce() to calculate total income. Log it.


// 2b. Use .filter() + .reduce() to calculate total expenses. Log it.


// 2c. Calculate and log the balance (income - expenses).



// ---- Exercise 3: Method Chaining ----

// 3a. Use .filter() and .reduce() to group expenses by category into an object.
//     Expected: { Housing: 4500, Food: 1400, Transportation: 900, ... }


// 3b. Use Object.entries() and .map() to log each category with its total.

