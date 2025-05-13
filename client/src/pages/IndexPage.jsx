import Post from "../Post"; // Import Post component to display each blog post
import {useEffect, useState} from "react";

export default function IndexPage() {
  // posts will store the list of blog posts fetched from the server
  const [posts,setPosts] = useState([]);


  useEffect(() => {
    // Fetch all blog posts from the backend
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts); // save posts into the state hooks
      });
    });
  }, []);
  return (
    <>
      <h1>Latest Blogs</h1>

      {/* display posts only if there are any */}
      {posts.length > 0 && posts.map(post => (
        // Spread the post data as props into the Post component
        <Post {...post} />
      ))}
    </>
  );
}