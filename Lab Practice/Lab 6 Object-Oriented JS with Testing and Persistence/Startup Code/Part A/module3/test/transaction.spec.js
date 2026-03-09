/* =================================
   Module 3: Unit Testing with Mocha and Chai
   Run with: npm test
   ================================= */

// Mocha gives you describe() and it() to organize tests.
// Chai gives you expect() to make assertions.
// Together they let you verify your code works correctly.

import { expect } from "chai";
import { Transaction, Account, SavingsAccount } from "../js/transaction.js";


// ---- Exercise 1: Test the Transaction class ----
// Write tests for:
//   a) Constructor sets all properties correctly
//   b) format() returns the right string for income
//   c) format() returns the right string for expense
//   d) isExpense() and isIncome() return correct booleans

// ---- Exercise 1: Test the Transaction class ----

// a) Constructor test
const incomeTx = new Transaction("Salary", 8000, "income", "Job");
const expenseTx = new Transaction("Rent", 4500, "expense", "Housing");

console.log("Constructor test:");
console.log(incomeTx.description === "Salary");
console.log(incomeTx.amount === 8000);
console.log(incomeTx.type === "income");
console.log(incomeTx.category === "Job");

// b) format() for income
console.log("Format income test:");
console.log(incomeTx.format() === "+8,000 QAR");

// c) format() for expense
console.log("Format expense test:");
console.log(expenseTx.format() === "-4,500 QAR");

// d) isExpense() and isIncome()
console.log("Boolean method tests:");
console.log(incomeTx.isIncome() === true);
console.log(incomeTx.isExpense() === false);
console.log(expenseTx.isExpense() === true);
console.log(expenseTx.isIncome() === false);
describe("Transaction", () => {

    // TODO: Test that constructor sets properties
    it("should set all properties from constructor", () => {
        // Create a transaction and check each property with expect().to.equal()

        const tx = new Transaction("Salary", 8000, "income", "Job");

        expect(tx.description).to.equal("Salary");
        expect(tx.amount).to.equal(8000);
        expect(tx.type).to.equal("income");
        expect(tx.category).to.equal("Job");
    });
   

    // TODO: Test format() for income
    it("should format income with + sign", () => {
        // Create an income transaction and check format() output
      
           const tx = new Transaction("Salary", 8000, "income", "Job");

        expect(tx.format()).to.equal("+8,000 QAR");

    });
    // TODO: Test format() for expense
    it("should format expense with - sign", () => {

         const tx = new Transaction("Rent", 4500, "expense", "Housing");

        expect(tx.format()).to.equal("-4,500 QAR");
    });

    // TODO: Test isExpense() and isIncome()
    it("should correctly identify transaction type", () => {
        const incomeTx = new Transaction("Salary", 8000, "income", "Job");
        const expenseTx = new Transaction("Rent", 4500, "expense", "Housing");

        expect(incomeTx.isIncome()).to.equal(true);
        expect(incomeTx.isExpense()).to.equal(false);
        expect(expenseTx.isExpense()).to.equal(true);
        expect(expenseTx.isIncome()).to.equal(false);
    });
});


// ---- Exercise 2: Test the Account class ----
// Write tests for:
//   a) deposit() increases balance
//   b) withdraw() decreases balance when funds available
//   c) withdraw() returns false when insufficient funds
//   d) getBalance() returns formatted string

describe("Account", () => {

    // TODO: Test deposit
    it("should increase balance after deposit", () => {
         const acc = new Account("Main", "checking", 1000);

        acc.deposit(500);

        expect(acc.balance).to.equal(1500);
    });

    // TODO: Test successful withdraw
    it("should decrease balance after withdraw", () => {
          const acc = new Account("Main", "checking", 1000);

        acc.withdraw(400);

        expect(acc.balance).to.equal(600);
    });

    // TODO: Test insufficient funds
    it("should return false when withdrawing more than balance", () => {
         const acc = new Account("Main", "checking", 1000);

        const result = acc.withdraw(2000);

        expect(result).to.equal(false);
        expect(acc.balance).to.equal(1000);
    });

    // TODO: Test getBalance formatting
    it("should return formatted balance string", () => {
         const acc = new Account("Main", "checking", 15000);

        expect(acc.getBalance()).to.equal("15,000 QAR");
    });
});


// ---- Exercise 3: Test the SavingsAccount class ----
// Write tests for:
//   a) Constructor sets type to "savings" automatically
//   b) Inherits deposit() from Account
//   c) applyProfit() calculates and adds profit correctly

describe("SavingsAccount", () => {

    // TODO: Test that type is "savings"
    it("should have type set to savings", () => {
           const savings = new SavingsAccount("Emergency", 10000, 0.05);

        expect(savings.type).to.equal("savings");
    });

    // TODO: Test inherited deposit
    it("should inherit deposit from Account", () => {
         const savings = new SavingsAccount("Emergency", 10000, 0.05);

        savings.deposit(1000);

        expect(savings.balance).to.equal(11000);
    });

    // TODO: Test applyProfit
    it("should calculate and add profit correctly", () => {
          const savings = new SavingsAccount("Emergency", 10000, 0.05);

        savings.applyProfit();

        expect(savings.balance).to.equal(10500);
    });
});
