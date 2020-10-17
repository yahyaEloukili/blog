const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const posts = require('./routes/posts');
const experiences = require('./routes/experiences');
const educations = require('./routes/educations');
const auth = require('./routes/auth');
const users = require('./routes/users');
const profiles = require('./routes/profiles');
const comments = require('./routes/comments');
const likes = require('./routes/likes');

const app = express();

// Body parser
app.use(express.json());


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}



// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/experiences', experiences);
app.use('/api/v1/educations', educations);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);
app.use('/api/v1/likes', likes);
app.use('/api/v1/comments', comments);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
