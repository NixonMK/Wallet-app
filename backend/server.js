require('dotenv').config();  // Only call dotenv.config() once
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
console.log('Mongo URI:', process.env.MONGO_URI);
console.log('JWT Secret:', process.env.JWT_SECRET);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));

