const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// Create an expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    description: req.body.description,
    amount: req.body.amount,
  });

  try {
    const savedExpense = await expense.save();
    res.json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an expense
router.patch('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const removedExpense = await Expense.findByIdAndDelete(req.params.id);
    res.json(removedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
