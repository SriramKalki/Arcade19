const form = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const amount = parseFloat(amountInput.value);

  const response = await fetch('/api/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, amount }),
  });

  const expense = await response.json();
  addExpenseToDOM(expense);
  updateTotalAmount();

  titleInput.value = '';
  amountInput.value = '';
});

async function fetchExpenses() {
  const response = await fetch('/api/expenses');
  const expenses = await response.json();
  expenses.forEach(addExpenseToDOM);
  updateTotalAmount();
}

function addExpenseToDOM(expense) {
  const li = document.createElement('li');
  li.textContent = `${expense.title}: $${expense.amount.toFixed(2)}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', async () => {
    await fetch(`/api/expenses/${expense._id}`, {
      method: 'DELETE',
    });
    li.remove();
    updateTotalAmount();
  });

  li.appendChild(deleteButton);
  expenseList.appendChild(li);
}

function updateTotalAmount() {
  let total = 0;
  document.querySelectorAll('#expense-list li').forEach((li) => {
    const amount = parseFloat(li.textContent.split('$')[1]);
    total += amount;
  });
  totalAmount.textContent = total.toFixed(2);
}

fetchExpenses();
