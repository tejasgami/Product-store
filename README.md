# Product store API

A RESTful API built with Node.js and MongoDB for managing products in an online store. Includes user authentication, product CRUD, pagination, search filtering, seeding, and input validation.

---

## Features

- User Registration & Login (JWT)
- Product CRUD (Create, Read, Update, Delete)
- Search & Pagination
- Validation using `express-validator`
- Password Hashing with bcryptjs
- Dockerfile for containerization
- Swagger Documentation 
- Jest tests

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Docker 
- Swagger


## Project Structure

```
project-root/
├── backend/
│   ├── config/              # DB connection config
│   │   └── db.js
│   ├── controllers/         # Route handlers
│   │   └── productController.js
│   │   └── authController.js
│   ├── middleware/          # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/              # Mongoose models
│   │   └── Product.js
│   │   └── User.js
│   ├── routes/              # API routes
│   │   └── productRoutes.js
│   │   └── authRoutes.js
│   ├── seed/                # Data seed scripts
│   │   └── seedUsers.js
│   │   └── seedProducts.js
│   ├── validators/          # Request validators
│   │   └── authValidator.js
│   ├── utils/               # Helper functions
│   │   └── helper.js
│   ├── tests/               # Jest test files
│   │   └── auth.test.js
│   │   └── product.test.js
│   ├── app.js               # Express app config
│   ├── server.js            # Entry point
│   ├── swagger.json         # Swagger documentation (optional)
│   ├── Dockerfile           # Docker config (optional)
│   ├── .env                 # Environment variables
│   ├── README.md
    ├── Online Store Product API.postman_collection.json
│   └── package.json

```

---

## Setup Instructions

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/productapi
JWT_SECRET=your_jwt_secret
```

Run the server:

```bash
npm run dev
```

---

## Seed Data

To populate your DB with test data:

```bash
node seed/seedUsers.js
node seed/seedProducts.js
```

---

## Validators

Using `express-validator` to validate request data. Example:

```js
// authValidator.js
const { body } = require('express-validator');

exports.registerValidator = [
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];
```

Apply in route:

```js
router.post('/register', registerValidator, authController.register);
```

---

## Testing

```bash
npm run test
```

---

## Docker

```bash
docker build -t product-api .
docker run -p 3000:3000 --env-file .env product-api
```

---

## API Documentation

- Swagger : `GET /api/docs` - Visit `http://localhost:3000/api/docs` for Swagger UI.

---

## Auth

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | `/api/auth/register`  | Register a new user |
| POST   | `/api/auth/login`     | Login user          |

---

## Products

| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| GET    | `/api/products`        | List (pagination & filtering) |
| GET    | `/api/products/:id`    | Get product by ID             |
| POST   | `/api/products`        | Create product                |
| PUT    | `/api/products/:id`    | Update product                |
| DELETE | `/api/products/:id`    | Delete product                |

---

## Query Parameters for `/api/products`

- `page` — page number (default: 1)
- `limit` — results per page (default: 10)
- `search` — search by product name

---

## Auth Header

```
Authorization: Bearer <token>
```

---

## Notes

- Passwords are hashed using bcrypt
- JWT tokens expire in 1 hour
- No role-based access implemented yet (Added commented code for role base)
