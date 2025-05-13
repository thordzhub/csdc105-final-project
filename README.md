# CSDC105 Final Project

## 📝 Fullstack Blog App (MERN Stack)

This is a blog application built using the **MERN** stack:
- **MongoDB** – for the database
- **Express.js** – for the backend server
- **React.js** – for the frontend UI
- **Node.js** – for running the server-side code

### 🔧 Features

- User registration and login
- User authentication with cookies
- Create, edit, and delete blog posts
- View a list of all blog posts
- View posts uploaded only by the logged-in user
- Upload and display images with posts
- Rich-text post content using a text editor (React Quill)
- Navigation between pages using React Router

### 🗂️ Project Structure

#### Frontend (React)
- `App.jsx` – Main app file where routes are defined
- `Header.jsx` – Top navigation bar that changes based on login status
- `Layout.jsx` – Wraps pages with a common layout (includes the Header)
- `pages/` – Contains all the pages like `Login`, `Register`, `CreatePost`, `PostPage`, etc.
- `Post.jsx` – A component to display a single blog post preview
- `Editor.jsx` – A text editor component for writing posts
- `UserContext.jsx` – Shares login status and user data across components

#### Backend (Node + Express)
- `server.js` – Main backend file (not shown here)
- Handles routes like `/register`, `/login`, `/logout`, `/profile`, `/post`, etc.
- Connects to MongoDB and manages user sessions using cookies

### ⚙️ How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
