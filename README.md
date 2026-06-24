# ShopAll — E-commerce Website

Full-stack e-commerce app built with **React.js + Node.js + Express + MongoDB**.

---

## 📁 Project Structure

```
shopall/
├── backend/         ← Node.js + Express API
│   ├── models/      ← MongoDB schemas (User, Product, Order)
│   ├── routes/      ← REST API routes
│   ├── middleware/  ← JWT auth middleware
│   ├── server.js    ← Entry point
│   ├── seed.js      ← Seed sample data
│   └── .env         ← Environment variables
└── frontend/        ← React.js app
    ├── src/
    │   ├── components/
    │   ├── context/   ← Auth + Cart context
    │   ├── pages/     ← All page components
    │   └── utils/     ← Axios API helper
    └── public/
```

---

## ⚙️ Prerequisites

Install these before starting:

1. **Node.js** (v18+) → https://nodejs.org
2. **MongoDB** → https://www.mongodb.com/try/download/community
   - Install and start MongoDB locally
   - Default URI: `mongodb://localhost:27017`

---

## 🚀 How to Run

### Step 1 — Start MongoDB

**Windows:**
```
net start MongoDB
```
**Mac/Linux:**
```bash
brew services start mongodb-community
# or
sudo systemctl start mongod
```

---

### Step 2 — Setup & Run Backend

```bash
cd shopall/backend

# Install dependencies
npm install

# Seed database with sample products + admin user
node seed.js

# Start backend server (runs on port 5000)
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

---

### Step 3 — Setup & Run Frontend

Open a **new terminal**:

```bash
cd shopall/frontend

# Install dependencies
npm install

# Start React app (runs on port 3000)
npm start
```

Browser will open at **http://localhost:3000** automatically.

---

## 🔐 Login Credentials

| Role  | Email              | Password   |
|-------|--------------------|------------|
| Admin | admin@shop.com     | admin123   |
| User  | Register yourself  | any 6+ chars |

---

## 🛠️ API Endpoints

### Auth
| Method | Route              | Description     |
|--------|--------------------|-----------------|
| POST   | /api/auth/register | Register user   |
| POST   | /api/auth/login    | Login           |

### Products
| Method | Route                    | Description        |
|--------|--------------------------|--------------------|
| GET    | /api/products            | List all products  |
| GET    | /api/products/:id        | Get single product |
| POST   | /api/products            | Add product (admin)|
| PUT    | /api/products/:id        | Edit product (admin)|
| DELETE | /api/products/:id        | Delete (admin)     |
| POST   | /api/products/:id/review | Add review         |

### Orders
| Method | Route              | Description           |
|--------|--------------------|-----------------------|
| POST   | /api/orders        | Place order           |
| GET    | /api/orders/my     | My orders             |
| GET    | /api/orders        | All orders (admin)    |
| PUT    | /api/orders/:id/status | Update status (admin)|

### Users
| Method | Route                         | Description        |
|--------|-------------------------------|--------------------|
| GET    | /api/users/profile            | Get profile        |
| PUT    | /api/users/profile            | Update profile     |
| POST   | /api/users/wishlist/:productId| Toggle wishlist    |
| GET    | /api/users                    | All users (admin)  |

---

## ✨ Features

- ✅ Multi-category product store (Fashion, Electronics, Food, Lifestyle)
- ✅ Search, filter by category, price range, sort
- ✅ Product detail pages
- ✅ Shopping cart with quantity control
- ✅ Wishlist
- ✅ User authentication (JWT)
- ✅ Checkout with address + payment method
- ✅ Order history
- ✅ Admin dashboard (add/delete products, manage orders, view users)

---

## 🔧 Environment Variables (backend/.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopall
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Change `JWT_SECRET` to a strong random string in production.
