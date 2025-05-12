import Post from "../Post";
import { useEffect, useState } from "react";

export default function MyPostsPage() {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    // grab only the posts you’ve created
    fetch("http://localhost:4000/my-posts", {
      credentials: "include", // send your auth cookie
    })
      .then(res => res.json())
      .then(posts => {
        setMyPosts(posts);
      })
      .catch(err => {
        console.error("Couldn’t fetch your posts:", err);
      });
  }, []);

  return (
    <>
        <h1>My Uploaded Blogs</h1>
      {myPosts.length > 0 ? (
        myPosts.map(post => (
          <Post key={post._id} {...post} />  // reuse your Post component
        ))
      ) : (
        <p>You haven’t written any posts yet.</p>  // friendly empty state
      )}
    </>
  );
}
