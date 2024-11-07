import React, { useState } from 'react';
import axios from 'axios';

const NewAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };

    try {
      const response = await axios.post('http://localhost:5000/register', userData);
      setMessage(response.data.message); // Success message from the backend
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating account');
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Create Account</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default NewAccount;
