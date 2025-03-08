require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRoutes');
const friendRouter = require('./routes/friendRouter');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

connectDB();

app.use(express.json()); // For parsing JSON bodies
app.use(cors({
  origin:'*', // Change to your frontend URL
  credentials: true,
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}



app.use("/api/", authRouter);         // For authentication routes (login, signup)
app.use("/api/friends", friendRouter);    // For friend request routes
app.use("/api/posts", postRouter);        // For post-related routes



app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});




