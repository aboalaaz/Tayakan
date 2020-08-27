const express = require('express');
const dotenv = require('dotenv');
var morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const User = require('./models/User');

// Route files
const courses = require('./routes/courses');
const users = require('./routes/users');
const specialization = require('./routes/specialization');
const chapter = require('./routes/chapters');
const question = require('./routes/question');
const comment = require('./routes/comment');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Create the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to datebase
connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers

// app.get('/api/v1/home');
// app.use('/api/v1/home', function (req, res) {
//   res.send('sdfasf');
// });
app.use('/api/v1/courses', courses);
app.use('/api/v1/users', users);
app.use('/api/v1/specialization', specialization);
app.use('/api/v1/chapter', chapter);
app.use('/api/v1/question', question);
app.use('/api/v1/comment', comment);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`App listening on port ${PORT}`.yellow.bold)
);

// Handle unhandle promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
