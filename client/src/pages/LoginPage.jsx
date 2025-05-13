import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext"; //the context that stores user info globally

export default function LoginPage() {
  // State to store username and password input
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false); // boolean variable for redirect after a successful login
  const {setUserInfo} = useContext(UserContext); // get function to update global user info
  
  // function for handling form submission
  async function login(ev) {
    ev.preventDefault();

    //send login request to the backend using POST method
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}), // Send credentials as JSON
      headers: {'Content-Type':'application/json'}, // tell the server that it is in JSON format
      credentials: 'include', // inlude the cookies for auth
    });

    //if login is successful, update user info and redirect
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo); // Store user info globally (useContext)
        setRedirect(true); // set the redirect to true if response is ok
      });
    } else {
      alert('wrong credentials'); //alerts error if login failed
    }
  }

  // If login was successful, redirect to home page
  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="form-container">
    {/* Login form */}
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <h3>Sign in now to upload blogs!</h3>

        {/* username input */}
        <input type="text"
              placeholder="username"
              value={username}
              onChange={ev => setUsername(ev.target.value)}/>
        {/* password input */}
        <input type="password"
              placeholder="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}/>

        {/* submit button */}
        <button>Login</button>
      </form>
    </div>
  );
}