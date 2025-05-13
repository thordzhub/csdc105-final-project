// Import global CSS styles
import './App.css';

// Import custom components
import Post from "./Post";
import Header from "./Header";

// Import routing tools from React Router
import {Route, Routes} from "react-router-dom";

// Import layout and page components
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import MyPostsPage from './pages/MyPostsPage';

// Import context provider to manage global user state
import {UserContextProvider} from "./UserContext";

function App() {
  return (
    // UserContextProvider = provides user state globally
    <UserContextProvider>
      {/* Define all app routes using React Router */}
      <Routes>
        {/* All nested routes will be rendered inside the Layout component */}
        <Route path="/" element={<Layout />}>

          {/* Home page (shows latest blog posts) */}
          <Route index element={<IndexPage />} />

          {/* Login and registration pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Page to create a new blog post */}
          <Route path="/create" element={<CreatePost />} />

          {/* Single post view page (dynamic route with post ID) */}
          <Route path="/post/:id" element={<PostPage />} />

          {/* Page to edit a post (also dynamic with post ID) */}
          <Route path="/edit/:id" element={<EditPost />} />

          {/* Page showing only the logged-in user's posts */}
          <Route path="/my-posts" element={<MyPostsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
