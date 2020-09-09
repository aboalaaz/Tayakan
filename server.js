const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
var morgan = require('morgan');
const passport = require('passport');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const fileupload = require('express-fileupload');

const errorHandler = require('./middleware/error');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');
const { connectDB } = require('./config/db');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

// Route files
const dashboard = require('./routes/dashboard');
const courses = require('./routes/courses');
const users = require('./routes/users');
const specialization = require('./routes/specialization');
const chapter = require('./routes/chapters');
const question = require('./routes/question');
const comment = require('./routes/comment');
const points = require('./routes/points');
const me = require('./routes/user');
const article = require('./routes/article');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Create the Express application
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attack
app.use(xss());

// Prevent hpp attack
app.use(hpp());

// Enable CORS
app.use(cors());

app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));

// SESSION SETUP

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.MONGO_URI }),
    cookie: {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
      // should by true
      httpOnly: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Connect flash
app.use(flash());

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to datebase
connectDB();

// File uploading
app.use(fileupload());

// Mount routers
app.get('/api/v1/myid', function (req, res) {
  console.log(req.session);
});

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/me', me);
app.use('/api/v1/', dashboard);
app.use('/api/v1/courses', courses);
app.use('/api/v1/users', users);
app.use('/api/v1/specialization', specialization);
app.use('/api/v1/chapter', chapter);
app.use('/api/v1/question', question);
app.use('/api/v1/comment', comment);
app.use('/api/v1/points', points);
app.use('/api/v1/article', article);

// Middleware errorHandler

app.use(errorHandler);

const PORT = process.env.PORT || 5000; ////////////////////////////////////////////

const server = app.listen(
  PORT,
  console.log(`Server listening on port ${PORT}`.yellow.bold)
);

// Handle unhandle promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
