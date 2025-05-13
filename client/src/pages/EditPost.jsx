import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams(); // Get post ID from the URL
  const [title, setTitle] = useState('');       // Post title
  const [summary, setSummary] = useState('');   // Post summary
  const [content, setContent] = useState('');   // Post content
  const [files, setFiles] = useState('');       // Post image (optional)
  const [redirect, setRedirect] = useState(false); // Redirect after update

  // this loads the existing post data when the component loads
  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  // function to handle post update
  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);

    // if file is included, include it in the request 
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    //Send the updated data to the backend using PUT (update) method
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    //set the redirect to true if update is successful
    if (response.ok) {
      setRedirect(true);
    }
  }

  // if redirect is true, redirect to the post's page
  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (

    // Form for edit/update
    <form onSubmit={updatePost}>

      {/* Input for the title */}
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />

      {/* Input for the summary */}
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />

      {/* File input for new image(optional) */}
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />

      {/* Rich text editor for post content */}
      <Editor onChange={setContent} value={content} />

      {/* Submit button */}
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  );
}