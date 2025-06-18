// Store our transactions in a simple array
var transactions = [
  {
    id: 1,
    name: "Monthly Salary",
    amount: 5000000,
    type: "income",
    date: "2025-06-18",
  },
  {
    id: 2,
    name: "Grocery Shopping",
    amount: 250000,
    type: "expense",
    date: "2025-06-17",
  },
  {
    id: 3,
    name: "Gas Station",
    amount: 150000,
    type: "expense",
    date: "2025-06-16",
  },
  {
    id: 4,
    name: "Freelance Project",
    amount: 1500000,
    type: "income",
    date: "2025-06-15",
  },
];

// Simple function to format money
function formatMoney(amount) {
  return "Rp " + amount.toLocaleString();
}

// Calculate total income
function getTotalIncome() {
  var total = 0;
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      total += transactions[i].amount;
    }
  }
  return total;
}

// Calculate total expense
function getTotalExpense() {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "expense") {
      total += transactions[i].amount;
    }
  }
  return total;
}

// Calculate balance
function getTotalBalance() {
  return getTotalIncome() - getTotalExpense();
}

// Update the money cards on screen
function updateMoneyCards() {
  var income = getTotalIncome();
  var expense = getTotalExpense();
  var balance = getTotalBalance();

  document.querySelector(".income .card-amount").textContent = formatMoney(income);
  document.querySelector(".expense .card-amount").textContent = formatMoney(expense);
  document.querySelector(".total-balance .card-amount").textContent = formatMoney(balance);
}

// Update transaction count
function updateTransactionCount() {
  var count = transactions.length;
  document.querySelector(".counter-value").textContent = count;
}

// Simple function to format date for display
function formatDate(dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Show transaction history
function showTransactionHistory() {
  var container = document.querySelector(".history-list");
  container.innerHTML = "";

  // sort by newest first
  var sorted = transactions.slice().sort(function (a, b) {
    return b.id - a.id;
  });

  for (var i = 0; i < sorted.length; i++) {
    var transaction = sorted[i];
    var sign = transaction.type === "income" ? "+" : "-";
    var dateDisplay = transaction.date ? formatDate(transaction.date) : "Today";

    var html =
      '<div class="history-item ' +
      transaction.type +
      '-item">' +
      '<div class="history-icon">💰</div>' +
      '<div class="history-info">' +
      '<h3 class="history-name">' +
      transaction.name +
      "</h3>" +
      '<p class="history-date">' +
      dateDisplay +
      "</p>" +
      "</div>" +
      '<div class="history-amount ' +
      transaction.type +
      '">' +
      sign +
      formatMoney(transaction.amount) +
      "</div>" +
      '<button class="delete-btn" onclick="deleteTransaction(' +
      transaction.id +
      ')">Delete</button>' +
      "</div>";

    container.innerHTML += html;
  }
}

// Add new transaction
function addTransaction() {
  var name = document.getElementById("transaction-name").value;
  var amount = parseInt(document.getElementById("amount").value);
  var type = document.querySelector('input[name="type"]:checked').value;
  var date = document.getElementById("date").value;

  // basic validation
  if (name === "" || amount <= 0) {
    alert("Please fill all fields correctly!");
    return;
  }

  var newTransaction = {
    id: transactions.length + 1,
    name: name,
    amount: amount,
    type: type,
    date: date,
  };

  transactions.push(newTransaction);

  // update everything
  updateMoneyCards();
  updateTransactionCount();
  showTransactionHistory();

  // clear form
  document.getElementById("transaction-name").value = "";
  document.getElementById("amount").value = "";
}

// Delete a transaction
function deleteTransaction(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].id === id) {
        transactions.splice(i, 1);
        break;
      }
    }

    updateMoneyCards();
    updateTransactionCount();
    showTransactionHistory();
  }
}

// Delete all transactions
function deleteAllTransactions() {
  if (confirm("Are you sure you want to delete all transactions? This action cannot be undone.")) {
    transactions = [];
    updateMoneyCards();
    updateTransactionCount();
    showTransactionHistory();
  }
}

// When page loads, run this
document.addEventListener("DOMContentLoaded", function () {
  updateMoneyCards();
  updateTransactionCount();
  showTransactionHistory();

  document.querySelector(".transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();
    addTransaction();
  });

  document.querySelector(".delete-all-btn").addEventListener("click", deleteAllTransactions);
});
