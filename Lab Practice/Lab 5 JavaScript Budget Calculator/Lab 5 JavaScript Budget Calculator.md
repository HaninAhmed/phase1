<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development Fundamentals</strong>
</p>

---

# Lab 5: JavaScript Budget Calculator

**Duration:** 120 minutes
**Theme:** Personal Finance Platform - Part 5 of 11
**Prerequisites:** Labs 1-4 completed

---

## Overview

You already know how to program in Java and Python. This lab introduces **JavaScript**, the language that runs in the browser and makes web pages interactive. The core concepts (variables, functions, arrays, loops) will feel familiar. What's new is how JavaScript interacts with the page through the DOM and event handling.

By the end of this lab, you'll turn your static MyFinance Dashboard into an interactive budget calculator.

### What You'll Build

An interactive MyFinance Dashboard featuring:

- Real-time budget calculations (income, expenses, balance)
- Dynamic dashboard card updates
- Form handling for adding transactions
- Transaction list with automatic totals
- Savings rate calculation

### Lab Structure

**Part A: Interactive JavaScript Basics (60 minutes)**
Instructor demonstrates each concept → You practice immediately → Repeat

**Part B: Build Your Budget Calculator (60 minutes)**
Apply all learned concepts to build a working budget calculator independently

---

## Learning Objectives

By the end of this lab, you will be able to:

- Declare variables using `let` and `const`
- Write functions using both declaration and arrow syntax
- Use array methods (`filter`, `map`, `reduce`) to process data
- Select and manipulate DOM elements
- Handle user events (click, input, submit)
- Build a working interactive calculator

---

## Prerequisites

- Labs 1-4 completed (responsive MyFinance Dashboard)
- **Node.js** installed - download from [https://nodejs.org](https://nodejs.org) (LTS version)
- **Code Runner** extension installed in VS Code - search "Code Runner" in the Extensions tab
- Text editor and browser ready

---

## Getting Started

1. Open the `Startup Code/` folder for this lab
2. **Part A Modules 1-3** run in the terminal: `node js/practice.js`
3. **Part A Modules 4-6** run in the browser: open `practice.html`
4. **Part B** runs in the browser: open `index.html`

---

# Part A: Interactive JavaScript Basics (60 minutes)

## Module 1: Variables & Data Types (8 minutes)

JavaScript variables work like Python and Java, but with `const` and `let` instead of type declarations.

**Variables: const vs let**

```javascript
// const - cannot be reassigned (like Java's final)
const accountName = "Main Checking";
const taxRate = 0.05;

// let - can be reassigned
let balance = 15250;
balance = balance + 1000;
balance += 500;            // shorthand

// const accountName = "Savings";  // ERROR! Can't reassign const
```

**Rule of thumb:** Use `const` by default. Use `let` only when the value needs to change.

**Template Literals and Objects**

```javascript
// Template literals (like Python f-strings)
const name = "MyFinance";
const greeting = `Welcome to ${name}`;

// Objects - key-value pairs (no class definition needed)
const transaction = {
    description: "Rent Payment",
    amount: 4500,
    category: "Housing",
    type: "expense"
};

console.log(transaction.description);  // "Rent Payment"
console.log(transaction["amount"]);    // 4500
```

### Practice (4 minutes)

Open `Startup Code/Part A/module1/js/practice.js` and complete the exercises.
Run with: `node js/practice.js`

---

## Module 2: Functions & Calculations (12 minutes)

JavaScript has two ways to define functions.

**Function Declarations**

```javascript
function formatCurrency(amount) {
    return amount.toLocaleString() + " QAR";
}

console.log(formatCurrency(15250));  // "15,250 QAR"

function calculateRemaining(income, expenses) {
    return income - expenses;
}
```

**Arrow Functions**

```javascript
// One-liner, implicit return
const formatCurrency = (amount) => amount.toLocaleString() + " QAR";

// Multi-line, explicit return
const calcSavingsRate = (income, expenses) => {
    const savings = income - expenses;
    const rate = (savings / income) * 100;
    return rate.toFixed(1);
};

console.log(calcSavingsRate(12000, 8500));  // "29.2"
```

### Practice (6 minutes)

Open `Startup Code/Part A/module2/js/practice.js` and complete the exercises.
Run with: `node js/practice.js`

---

## Module 3: Arrays & Array Methods (10 minutes)

JavaScript arrays have built-in methods for filtering, transforming, and aggregating data. If you've used Java Streams or Python list comprehensions, these will feel familiar.

**filter, map, reduce**

```javascript
const transactions = [
    { description: "Salary", amount: 12000, type: "income" },
    { description: "Rent", amount: 4500, type: "expense" },
    { description: "Groceries", amount: 1200, type: "expense" },
    { description: "Freelance", amount: 3000, type: "income" }
];

// FILTER - get items that match a condition
const expenses = transactions.filter(t => t.type === "expense");
// [{Rent, 4500}, {Groceries, 1200}]

// MAP - transform each item
const descriptions = transactions.map(t => t.description);
// ["Salary", "Rent", "Groceries", "Freelance"]

// REDUCE - combine all items into a single value
const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
// 5700

// CHAINING - combine methods
const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
// 15000
```

### Practice (5 minutes)

Open `Startup Code/Part A/module3/js/practice.js` and complete the exercises.
Run with: `node js/practice.js`

---

## Module 4: DOM Selection & Manipulation (10 minutes)

The **DOM** (Document Object Model) is how JavaScript reads and changes HTML elements on the page. Unlike Java or Python, your code runs inside the browser and can directly modify what the user sees.

**Connecting JS to HTML**

For a JavaScript file to run in the browser, you need to link it from your HTML using a `<script>` tag. Place it at the bottom of `<body>` so the HTML elements load before your script tries to access them:

```html
<body>
    <!-- your HTML content -->

    <script src="js/practice.js"></script>
</body>
```

Without this tag, your JS file just sits there doing nothing. This is different from Modules 1-3 where we ran JS directly with Node.

**Selecting Elements**

```javascript
// By ID - returns ONE element
const balanceEl = document.getElementById("total-balance");

// By CSS selector - returns FIRST match
const firstCard = document.querySelector(".card");

// By CSS selector - returns ALL matches (NodeList)
const allCards = document.querySelectorAll(".card");
console.log("Found", allCards.length, "cards");
```

**Modifying Elements**

```javascript
// Change text
balanceEl.textContent = "50,000 QAR";

// Change HTML (with formatting)
balanceEl.innerHTML = "<strong>50,000</strong> QAR";

// Add/remove CSS classes
balanceEl.classList.add("text-success");
balanceEl.classList.remove("text-danger");

// Create new elements
const newCard = document.createElement("div");
newCard.className = "card";
newCard.textContent = "New Card!";
document.querySelector("main").appendChild(newCard);
```

### Practice (5 minutes)

Open `Startup Code/Part A/module4/practice.html` in the browser. Start with Exercise 0: add the `<script>` tag to your HTML, then complete the exercises in `js/practice.js`.

---

## Module 5: Event Listeners (12 minutes)

Event listeners let you run code when the user does something: clicking a button, typing in an input, or submitting a form.

**Click Events**

```javascript
const button = document.getElementById("add-btn");

button.addEventListener("click", () => {
    console.log("Button clicked!");
});
```

**Input Events**

```javascript
const input = document.getElementById("amount-input");

input.addEventListener("input", (event) => {
    const value = event.target.value;
    console.log("User typed:", value);
});
```

**Form Submit Events**

```javascript
const form = document.getElementById("transaction-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();  // IMPORTANT: prevent page reload

    const description = document.getElementById("desc").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    console.log("Form submitted:", { description, amount, type });
    event.target.reset();
});
```

### Practice (6 minutes)

Open `Startup Code/Part A/module5/practice.html` in the browser, then edit `js/practice.js`.

---

## Module 6: Mini Budget Calculator (8 minutes)

This module combines everything from Modules 1-5 into a working calculator.

**Putting It All Together**

```javascript
const transactions = [];

function updateDashboard() {
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    document.getElementById("total-income").textContent =
        totalIncome.toLocaleString() + " QAR";
    document.getElementById("total-expenses").textContent =
        totalExpenses.toLocaleString() + " QAR";
    document.getElementById("total-balance").textContent =
        (totalIncome - totalExpenses).toLocaleString() + " QAR";
}

function renderTransactions() {
    const list = document.getElementById("transaction-list");
    list.innerHTML = transactions.map(t => `
        <div class="transaction-item">
            <span>${t.description}</span>
            <span>${t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()} QAR</span>
        </div>
    `).join("");
}

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    transactions.push({
        description: document.getElementById("desc").value,
        amount: Number(document.getElementById("amount").value),
        type: document.getElementById("type").value
    });
    updateDashboard();
    renderTransactions();
    e.target.reset();
});
```

### Practice (4 minutes)

Open `Startup Code/Part A/module6/practice.html` in the browser, then edit `js/practice.js`.

**Self-Check:**
- [ ] Does the dashboard update when you add a transaction?
- [ ] Does the transaction list show all entries?
- [ ] Does the clear button reset everything?

---

# Part B: Build Your Budget Calculator (60 minutes)

## Task: Add JavaScript to Your Dashboard

Now apply everything you learned to build a working budget calculator independently.

### Setup

1. Open `Startup Code/Part B/`
2. The HTML and CSS are already provided. Open `index.html` in the browser
3. Open `js/app.js` - this is where you'll write all your JavaScript

### Requirements

Build the calculator by completing these steps in `js/app.js`:

#### Step 1: Helper Functions
Create `formatCurrency(amount)` and `calcSavingsRate(income, expenses)` functions.

#### Step 2: Data Storage
Create an empty array to store transaction objects.

#### Step 3: Dashboard Update Function
Create `updateDashboard()` that calculates totals from the transactions array using `filter` + `reduce`, then updates the dashboard card elements (`#total-income`, `#total-expenses`, `#total-balance`, `#savings-rate`).

#### Step 4: Render Transactions Function
Create `renderTransactions()` that displays all transactions in the `#transaction-body` table. Handle the empty state and use color to distinguish income from expenses.

#### Step 5: Form Event Listener
Add a submit handler to `#quick-transaction-form` that reads form values, creates a transaction object, adds it to the array, updates the display, and resets the form.

#### Step 6: Clear Button
Add a click handler to `#clear-btn` that empties the array and updates the display.

### Testing Checklist

- [ ] Add income (e.g., Salary: 12,000 QAR) and verify the cards update
- [ ] Add expenses (e.g., Rent: 4,500 QAR) and verify the balance decreases
- [ ] Transaction appears in the table
- [ ] Savings rate calculates correctly
- [ ] Clear All button resets everything
- [ ] Form resets after each submission
- [ ] Multiple transactions work correctly

---

## JavaScript Quick Reference

### Variables

```javascript
const name = "fixed value";  // Cannot reassign
let count = 0;               // Can reassign
count = count + 1;
```

### Functions

```javascript
// Declaration
function add(a, b) { return a + b; }

// Arrow
const add = (a, b) => a + b;
```

### Arrays

```javascript
array.push(item);
array.filter(item => condition);
array.map(item => transform);
array.reduce((sum, item) => sum + item.value, 0);
```

### DOM

```javascript
document.getElementById("id");
document.querySelector(".class");
document.querySelectorAll("tag");

element.textContent = "new text";
element.innerHTML = "<b>bold</b>";
element.classList.add("class-name");
```

### Events

```javascript
element.addEventListener("click", () => { });
element.addEventListener("input", (e) => { e.target.value });
form.addEventListener("submit", (e) => { e.preventDefault(); });
```

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Missing `event.preventDefault()` | Form refreshes the page |
| Using `=` instead of `===` | `=` assigns, `===` compares |
| Forgetting `Number()` on input values | Input values are strings by default |
| Calling function without `()` | `updateDashboard` vs `updateDashboard()` |
| Misspelling element IDs | Check HTML for exact ID names |

---

## Submission

Submit the following:
- Practice files from Part A (module1-6)
- Part B with working budget calculator (`js/app.js`)

---

## Resources

- [MDN JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- [JavaScript.info](https://javascript.info/)
- [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN DOM Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

---

## What's Next?

In **Lab 6: Account Manager**, you'll learn:
- JavaScript classes and objects
- OOP (Object-Oriented Programming)
- localStorage for data persistence
- Building a class-based architecture for your finance platform

Your budget calculator will evolve from simple functions to a well-organized, class-based system!

---

**Author:** Abdulahi Hassen
