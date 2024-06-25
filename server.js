const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const expenseRoute = require('./routes/expense');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/expenses', expenseRoute);

mongoose.connect('mongodb://localhost:27017/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
