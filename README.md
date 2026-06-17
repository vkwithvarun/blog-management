# DevBlog 📝

A full-stack Markdown blogging platform built with Node.js, Express, MongoDB, and EJS. Users can sign up, write Markdown posts that render as sanitized HTML, tag and search articles, and only edit or delete the posts they authored.

## Features

- **Authentication** — sign up / log in / log out with hashed passwords (bcrypt) and persistent sessions stored in MongoDB
- **Ownership permissions** — only the author of a post can edit or delete it
- **Markdown rendering** — posts are written in Markdown and converted to sanitized HTML (`marked` + `DOMPurify`) to prevent XSS
- **Tags** — add comma-separated tags to a post, shown as badges
- **Search** — filter the homepage by title
- **Pagination** — six posts per page
- **Flash messages** — success/error feedback after actions
- **Responsive UI** — Bootstrap 5

## Tech Stack

Node.js, Express, MongoDB (Mongoose), EJS, Bootstrap 5, bcryptjs, express-session + connect-mongo, connect-flash, marked, DOMPurify, slugify, method-override.

## Project Structure

```
.
├── server.js              # app entry point
├── config/database.js     # MongoDB connection
├── middleware/auth.js      # requireLogin guard
├── models/
│   ├── article.js          # Article schema (slug, sanitizedHTML, tags, author)
│   └── user.js              # User schema (hashed password)
├── routes/
│   ├── articles.js         # article CRUD
│   └── auth.js              # signup/login/logout
├── views/
│   ├── partials/            # navbar, flash messages
│   ├── articles/             # index, new, edit, show, form_field
│   └── auth/                  # login, signup
└── public/css/style.css
```

## Local Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/Blog_WebSite.git
   cd Blog_WebSite
   npm install
   ```

2. **Create a MongoDB Atlas database** (free tier) and copy the connection string.

3. **Create a `.env` file** in the project root (copy `.env.example`):
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   SESSION_SECRET=a_long_random_string
   PORT=4401
   ```

4. **Run the app**
   ```bash
   npm start
   ```
   Visit `http://localhost:4401`.

## Deployment

This app is configured to deploy on **Render** (or any Node-friendly host) using the `MONGODB_URI`, `SESSION_SECRET`, and `PORT` environment variables set in the host's dashboard — no code changes needed.

## License

MIT
