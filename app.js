const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const rateLimit = require('express-rate-limit');

const app = express();
// Cors configuration

const corsOptions = {
  origin: process.env.MONGO_DEV_URL, // Allow only requests from this origin
  methods: 'GET,POST,PUT,DELETE', // Allow only GET and POST methods
  allowedHeaders: 'Content-Type', // Allow only specific headers
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rate limiting middleware code
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit per IP address
  message: 'Too many requests from this IP, try again after some time',
});

app.use('/api/', apiLimiter);

module.exports = app;
