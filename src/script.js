const transDesc = document.getElementById("desc")
const transAmount = document.getElementById("amount")
const incomeBtn = document.getElementById("incomeBtn")
const expenseBtn = document.getElementById("expenseBtn")

const incomeList = document.getElementById("incomeList")
const expenseList = document.getElementById("expenseList")
const transactionList = document.getElementById("transactionList")
const balance = document.getElementById("balance")

let incomes = []
let expenses = []
let transactions = []


function addTransaction(isIncome){
    const desc = transDesc.value;
    const amount = Number(transAmount.value);
    if (!desc || isNaN(amount) || amount <= 0) return;

    let type = isIncome ? "Inkomst" : "Utgift";
    const newTransaction = {
        transDesc: desc,
        transAmount: amount,
        type: type,
    };

    transactions.push(newTransaction);

    if(isIncome){
        incomes.push({ transDesc: desc, transAmount: amount });
    } else {
        expenses.push({ transDesc: desc, transAmount: amount });
    }

    transDesc.value = "";
    transAmount.value = "";
    renderTransactions();
    renderIncomes();
    renderExpenses();
    renderBalance();
}

function renderIncomes(){

    incomeList.innerHTML = ""

    for (let income of incomes){
        const li = document.createElement("li")
        li.textContent = `Beskrivning: ${income.transDesc}, ${income.transAmount}kr`
        incomeList.appendChild(li)
    }
}

function renderExpenses(){

    expenseList.innerHTML = ""

    for (let expense of expenses){
        const li = document.createElement("li")
        li.textContent = `Beskrivning: ${expense.transDesc}, ${expense.transAmount}kr`
        expenseList.appendChild(li)
    }
}

function renderTransactions(){

    transactionList.innerHTML = ""

    for (let transaction of transactions){
        const li = document.createElement("li")
        li.textContent = `Beskrivning: ${transaction.transDesc}, ${transaction.transAmount}kr, ${transaction.type}`
        transactionList.appendChild(li)
    }
}

function renderBalance(){

    let incomeSum = 0;
    let expenseSum = 0;
    for (let income of incomes){
        incomeSum += income.transAmount;
    }
    for (let expense of expenses){
        expenseSum += expense.transAmount;
    }
    balance.textContent = incomeSum - expenseSum;
}

incomeBtn.addEventListener("click", () => {
    addTransaction(true);
});

expenseBtn.addEventListener("click", () => {
    addTransaction(false);
});