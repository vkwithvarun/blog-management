# DevBlog 📝

🚀 **Live Demo:** https://devblog-713s.onrender.com

A full-stack blogging platform built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can create accounts, write articles in Markdown, search posts, organize content with tags, and manage only their own articles through secure authentication and authorization.

---

## Features

* 🔐 User Authentication (Sign Up, Login, Logout)
* 🔑 Password hashing using bcrypt
* ✍️ Create, Read, Update, and Delete (CRUD) blog posts
* 📝 Markdown support with HTML rendering
* 🛡️ XSS protection using DOMPurify
* 🏷️ Tag-based article organization
* 🔍 Search articles by title
* 📄 Pagination (6 posts per page)
* 👤 Author-based permissions
* 📢 Flash messages for user feedback
* 📱 Responsive UI with Bootstrap 5
* 💾 MongoDB Atlas cloud database integration

---

## Tech Stack

Node.js, Express, MongoDB (Mongoose), EJS, Bootstrap 5, bcryptjs, express-session + connect-mongo, connect-flash, marked, DOMPurify, slugify, method-override.

---

## Project Structure

```text
.
├── server.js
├── config/
│   └── database.js
├── middleware/
│   └── auth.js
├── models/
│   ├── article.js
│   └── user.js
├── routes/
│   ├── articles.js
│   └── auth.js
├── views/
│   ├── partials/
│   ├── articles/
│   └── auth/
├── public/
│   └── css/
│       └── style.css
└── package.json
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vkwithvarun/Blog_WebSite.git
cd Blog_WebSite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_secure_random_secret
PORT=4401
```

### 4. Start the Application

```bash
npm start
```

Open your browser and visit:

```text
http://localhost:4401
```

---

## Deployment

The application is deployed on Render and uses MongoDB Atlas as the database service.

Required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secure_random_secret
PORT=10000
```

Live Application:

https://devblog-713s.onrender.com

---

## Future Enhancements

* User profile pages
* Rich text editor
* Image upload support
* Article categories
* Comment system
* Like and bookmark functionality
* Admin dashboard

---

## License

This project is licensed under the MIT License.

---

## Author

**Varun Kumar**

GitHub: https://github.com/vkwithvarun
