# 🛒 OrderFlow - Product Order Management System  

OrderFlow is a full-stack web application that simulates a **product order management system**.  
- Customers can place product orders.  
- Admins can log in securely to view and manage orders via a protected dashboard.  

Built with **Next.js (frontend)** and **Node.js + Express + MongoDB (backend)**.  

---

## ✨ Features  

### 👤 Customer  
- Place product orders with details (name, contact info, address, product, quantity, etc.).  
- Responsive and user-friendly order form.  

### 🔐 Admin  
- Secure login using JWT authentication.  
- Orders displayed in an interactive order table.  
- Manage orders in real-time.  

### ⚙️ General  
- Secure cookie-based authentication.  
- Fully responsive design.  
- Clean UI with Tailwind CSS.  

---

## 🛠️ Tech Stack  

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** JWT + HttpOnly Cookies  
- **Icons:** Lucide-react  
- **Linting:** ESLint + Prettier  

---

## 🚀 Getting Started  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/Animiiexe/orderflow.git
cd orderflow
```

### 2️⃣ Install dependencies  
#### Frontend (Next.js)  
```bash
cd client
npm install
```

#### Backend (Express)  
```bash
cd server
npm install
```

### 3️⃣ Environment Variables  

Create a `.env` file in the **server** folder:  

```env
MONGO_URL=mongodb+srv://your-mongo-uri
JWT_SECRET=your-secret-key
NODE_ENV=development
PORT=8080
```

### 4️⃣ Run the app  

#### Backend  
```bash
cd server
npm run dev
```

#### Frontend  
```bash
cd client
npm run dev
```

Now open 👉 [http://localhost:3000](http://localhost:3000)  

---

## 📂 Project Structure  

```
orderflow/
├── client/             # Next.js frontend
│   ├── app/
│   ├── components/
│   └── ...
├── server/             # Express backend
│   ├── models/
│   ├── controllers/
│   └── routes/
└── README.md
```

---

## 🖼️ Preview  

### Customer View  
📝 Place a new order easily.  

### Admin Dashboard  
📊 View and manage all orders in a protected table.  

---

## 📜 License  

MIT License © 2025
