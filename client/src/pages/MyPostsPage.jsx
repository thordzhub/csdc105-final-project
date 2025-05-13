import Post from "../Post"; // Import the Post component to display each blog post
import { useEffect, useState } from "react";

export default function MyPostsPage() {
  const [myPosts, setMyPosts] = useState([]); // State to store the current user's posts

  useEffect(() => {
    // This runs only once when the component loads

    // Fetch only the posts created by the logged-in user
    fetch("http://localhost:4000/my-posts", {
      credentials: "include", // Sends the authentication cookie (for login session)
    })
      .then(res => res.json()) // Convert the response to JSON
      .then(posts => {
        setMyPosts(posts); // Save the posts in the state
      })
      .catch(err => {
        // If there is a problem fetching posts, show error in console
        console.error("Couldn’t fetch your posts:", err);
      });
  }, []); // Empty array means this useEffect runs only once (on page load)

  return (
    <>
      <h1>My Uploaded Blogs</h1>

      {/* If the user has posts, display them using the Post component */}
      {myPosts.length > 0 ? (
        myPosts.map(post => (
          <Post key={post._id} {...post} /> // Render each post (spread props into Post)
        ))
      ) : (
        // Show this message if no posts are found
        <p>You haven’t written any posts yet.</p>
      )}
    </>
  );
}
