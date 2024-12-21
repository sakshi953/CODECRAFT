const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expenses');
const expenseChart = document.getElementById('expense-chart');

let expenses = [];
let chart;

// Add Expense
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('expense-name').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;

  if (name && amount && category) {
    const expense = { name, amount, category };
    expenses.push(expense);
    updateExpenseList();
    updateChart();
    expenseForm.reset();
  }
});

// Update Expense List
function updateExpenseList() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name} - $${expense.amount} (${expense.category})
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

// Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  updateChart();
}

// Update Chart
function updateChart() {
  const categories = [...new Set(expenses.map(expense => expense.category))];
  const data = categories.map(category =>
    expenses.filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(expenseChart, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    }
  });
}
