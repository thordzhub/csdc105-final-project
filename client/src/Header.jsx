// Import the Link component for navigation between routes/pages
import { Link } from "react-router-dom";

// Import React hooks: useContext to access context, useEffect to fetch user data on mount, useState if needed
import { useContext, useEffect, useState } from "react";

// Import the UserContext to get and set the current user's info (shared state)
import { UserContext } from "./UserContext";

export default function Header() {
  // Destructure userInfo and setUserInfo from the UserContext
  const { setUserInfo, userInfo } = useContext(UserContext);

  // Fetch the currently logged-in user's profile when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include', // sends cookies with the request for authentication
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo); // update global userInfo state
      });
    });
  }, []);

  // Function to log the user out
  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null); // reset userInfo in context after logging out
  }

  // Optional chaining: if userInfo exists, get the username
  const username = userInfo?.username;

  return (
    <header>
      {/* Logo or brand link, navigates to home page */}
      <Link to="/" className="logo">ThorJat Blogs</Link>
      <nav>
        {username && (
          // If user is logged in, show these navigation links
          <>
            <Link to="/create">Create new post</Link>
            <Link to="/my-posts">My Uploads</Link>
            {/* Clicking logout sends request and clears userInfo */}
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          // If user is not logged in, show login/register links
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
