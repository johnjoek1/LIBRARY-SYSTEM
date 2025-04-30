const express = require('express');
const router = express.Router();
const Borrow = require('../Models/borrow');
const Book = require('../Models/book');
const auth = require('../Middlewares/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findOne({ _id: bookId, userId: req.user.id });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const borrow = new Borrow({
      userId: req.user.id,
      bookId,
    });
    await borrow.save();
    res.status(201).json(borrow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id/return', auth, async (req, res) => {
  try {
    const borrow = await Borrow.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, status: 'borrowed' },
      { status: 'returned', returnDate: Date.now() },
      { new: true }
    );
    if (!borrow) return res.status(404).json({ error: 'Borrow record not found or already returned' });
    res.json(borrow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const borrows = await Borrow.find({ userId: req.user.id }).populate('bookId');
    res.json(borrows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;