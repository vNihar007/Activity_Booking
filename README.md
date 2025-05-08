## 🚀 MeetX Activity Booking API

A RESTful backend built with **Node.js**, **Express.js**, and **MongoDB** for a basic activity booking platform.

---

## 📦 Tech Stack

* **Backend:** Node.js + Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JWT (Bearer Token)
* **Validation:** Joi
* **API Testing:** Postman

---

## 📁 Project Structure

```
meetx-backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── .env
├── index.js
└── README.md
```

---

## 📌 Environment Variables

Created an `.env` file in the root with the following:

```env
PORT=3000
MONGO_DB_URL=mongodb://localhost:27017/meetx
JWT_SECRET=your_very_secret_key
```

---

## 🔑 API Authentication

Routes marked with `🔐` require an `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📮 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register user     |
| POST   | `/api/auth/login`    | Login & get token |

---

### 🏷️ Activities

| Method  | Endpoint          | Description         |
| ------- | ----------------- | ------------------- |
| GET     | `/api/activities` | List all activities |
| POST 🔐 | `/api/activities` | Create new activity |

---

### 📘 Bookings

| Method  | Endpoint                    | Description                    |
| ------- | --------------------------- | ------------------------------ |
| POST 🔐 | `/api/bookings/:activityId` | Book an activity by ID         |
| GET 🔐  | `/api/bookings/my`          | Get bookings of logged-in user |

---

## 🧪 Postman Collection

Import the included `Meetx_Assignment.postman_collection.json` file into Postman. It contains:

* 🔐 Auth routes
* 🏷️ Activity routes
* 📘 Booking routes
* Headers + Bearer token pre-set

---

## 🛠️ Run Locally

```bash
git clone https://github.com/your-username/meetx-backend.git
cd meetx-backend
npm install
npm run dev
```

Server will run on `http://localhost:3000`

---

Update your `.env` for production DB and secret key accordingly.

---
