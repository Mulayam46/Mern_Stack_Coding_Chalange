const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/transactionsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  dateOfSale: String,
  category: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Fetch and initialize the database with seed data
app.get('/api/init-database', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);
    res.json({ message: 'Database initialized successfully.' });
  } catch (error) {
    console.error('Error initializing database:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other APIs (list-transactions, statistics, bar-chart, pie-chart, combined-response)
// Implement similar to the previous example

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
