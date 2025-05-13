import { useState } from "react";

export default function RegisterPage() {
  // React state hooks to store form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function that handles form submission
  async function register(ev) {
    ev.preventDefault(); // Prevents default page reload on form submit

    // Send a POST request to the backend registration endpoint
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }), // Send the user credentials as JSON
      headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
    });

    // Alert user based on whether registration was successful or not
    if (response.status === 200) {
      alert('Registration successful');
    } else {
      alert('Registration failed'); // Could be due to existing username or server error
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <h3>Create an account.</h3>

      {/* Input field for username */}
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />

      {/* Input field for password */}
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />

      {/* Submit button to trigger registration */}
      <button>Register</button>
    </form>
  );
}
