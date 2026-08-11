🛒 Digital Shop
A full-stack e-commerce web application built with Next.js (App Router), TypeScript, MongoDB, and Tailwind CSS. The project includes a complete customer-facing storefront and a full admin dashboard for managing the store — built to practice real-world full-stack development including authentication, database design, API routes, and role-based dashboards.

🔗 Live Demo: digital-online-shop.netlify.app

##Screen shots:
home page:
<img width="1200" height="582" alt="a" src="https://github.com/user-attachments/assets/98436888-9a0b-46b9-8d1d-836086d10871" />

p-admin:
<img width="1200" height="584" alt="b" src="https://github.com/user-attachments/assets/ca9cacfc-3973-440c-9afc-8b196d758459" />

p-admin/addProducts:
<img width="1200" height="551" alt="c" src="https://github.com/user-attachments/assets/87093f76-c4e7-4c78-8cc7-0298f35b5634" />

p-admin/orders:
<img width="1200" height="608" alt="d" src="https://github.com/user-attachments/assets/e2aa8281-fc18-4868-b3c2-66f0a768a324" />

cart:
<img width="1200" height="583" alt="e" src="https://github.com/user-attachments/assets/4e194654-33be-4271-a921-fd44bad0fe6c" />

product details:
<img width="1200" height="596" alt="f" src="https://github.com/user-attachments/assets/86f30490-f9c8-4226-8c1c-a297d914e7f8" />


---

✨ Features

👤 Customer

- 🔐 User registration and login
- 🔑 JWT-based authentication
- 🔎 Product search
- 📦 Product details
- 🛒 Shopping cart
- ❤️ Wishlist
- 📝 Product comments and reviews
- 🧾 Order placement
- 📋 Order history
- 👤 Personal user dashboard
- 📱 Responsive design

👨‍💼 Admin Dashboard

- 📊 Store statistics
- 🛍️ Create, update and delete products
- 👥 User management
- 📦 Order management
- 💬 Comment moderation
- 🔐 Protected admin routes

---

🛠️ Tech Stack

Frontend

- Next.js – App Router
- TypeScript
- React
- Tailwind CSS
- ShadCN UI
- Swiper
- AOS
- React Toastify

Backend

- Next.js Route Handlers
- MongoDB
- Mongoose
- JWT Authentication
- Middleware

---

🧠 Concepts Practiced

This project was built to practice real-world full-stack development concepts:

- Next.js App Router
- Server & Client Components
- REST API design
- Route Handlers
- MongoDB schema design
- Mongoose models
- JWT authentication
- Authentication & authorization
- Role-based access control
- Protected routes
- Middleware
- Cookie-based authentication
- Form handling and validation
- Responsive UI development
- Reusable components
- Admin dashboard architecture

---

🔐 Authentication Flow

Register / Login
       ↓
   API Route
       ↓
Validate User
       ↓
Hash Password
       ↓
Generate JWT
       ↓
Store Token in Cookie
       ↓
Middleware
       ↓
Verify Authentication
       ↓
Access Protected Route

---

📂 Project Structure

Digital-shop/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── products/
│   └── ...
│
├── components/
│   └── ui/
│
├── lib/
├── models/
├── public/
├── utils/
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md

---

🚀 Getting Started

1. Clone the repository

git clone https://github.com/Elashf/Digital-shop.git

2. Navigate to the project

cd Digital-shop

3. Install dependencies

npm install

4. Configure environment variables

Create a ".env.local" file and add your required environment variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

5. Run the development server

npm run dev

Open:

http://localhost:3000



🌐 Live Demo

You can try the deployed application here:

https://digital-online-shop.netlify.app/

---

👩‍💻 Author

Ela Farahani

Frontend / Full-Stack Developer
Next.js • React • TypeScript

- GitHub: https://github.com/Elashf

---

⭐ If you find this project useful, consider giving it a star!
