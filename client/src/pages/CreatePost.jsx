import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  // State hooks to store user input
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false); // used for navigation(redirection) after creating a post

  async function createNewPost(ev) {
    // Create a FormData object to send text and image together
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();

    //send the data to the backend server
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include', // Send cookies (for auth)
    });
    // If post creation is successful, redirect to homepage
    if (response.ok) {
      setRedirect(true);
    }
  }

  //checks if redirect is true and go back to homepage 
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <>
    <h1>Create New Post</h1>

    {/* Form for creating a new blog post */}
    <form onSubmit={createNewPost}>

      {/* Input for post title */}
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />

      {/* Input for post summary */}
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />

      {/* Input for file (image) upload */}
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      
      {/* Rich text editor fot the post content */}
      <Editor value={content} onChange={setContent} />

      {/* Button for submitting */}
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
    </>
  );
}