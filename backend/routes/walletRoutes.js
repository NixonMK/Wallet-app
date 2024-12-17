// routes/walletRoutes.js
const express = require('express');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Create wallet or get wallet by userId
router.post('/create', async (req, res) => {
  const { userId } = req.body;
  try {
    const wallet = new Wallet({ userId });
    await wallet.save();
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Handle transactions
router.post('/transaction', async (req, res) => {
  const { walletId, type, amount, category } = req.body;
  const transaction = new Transaction({ walletId, type, amount, category });

  try {
    await transaction.save();

    const wallet = await Wallet.findById(walletId);
    if (type === 'send') wallet.balance -= amount;
    if (type === 'receive') wallet.balance += amount;

    await wallet.save();
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Freeze/Unfreeze wallet
router.put('/freeze/:walletId', async (req, res) => {
  const { walletId } = req.params;
  try {
    const wallet = await Wallet.findById(walletId);
    wallet.isFrozen = !wallet.isFrozen;
    await wallet.save();
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
