const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const routes = require('./routes'); // Import your routes
const bodyParser = require('body-parser');
const session = require('express-session');
const {passport} = require('./config/authentication');
const serviceRequestorRoutes = require('./routes/serviceRequestorRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const crypto = require('crypto');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const secretKey = crypto.randomBytes(32).toString('hex');


// Use cors middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use session middleware
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Set the session cookie's max age in milliseconds (here, it's 7 days)
      httpOnly: true, // Ensures the cookie is only accessible via HTTP(S) and not JavaScript
      secure: true, // Set to true if your app is served over HTTPS
      sameSite: 'none', // Set to 'none' if your frontend and backend are served on different domains
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database and tables synchronized.');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

// Use your routes
app.use('/', routes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/service-requestors', serviceRequestorRoutes);
app.use('/api/service-providers', serviceProviderRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
