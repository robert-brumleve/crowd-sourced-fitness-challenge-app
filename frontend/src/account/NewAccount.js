import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import url from "../components/Backend_URL";

const NewAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [showImageSelector, setShowImageSelector] = useState(false); // State for controlling modal visibility
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send as multipart/form-data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (selectedFile) {
      formData.append('profilePicture', selectedFile); // Append the file
    } else if (profilePicture) {
      formData.append('profilePicture', profilePicture); // If a default picture is chosen
    }

    try {
      const response = await axios.post(`${url}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
      });
      setMessage(response.data.message); // Success message from backend
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating account");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setSelectedFile(file); // Store the file in state
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the image
      setProfilePicture(imageUrl); // Set the preview image
    }
  };

  const handleImageSelect = (image) => {
    setProfilePicture(image); // Set the selected image path
    setShowImageSelector(false); // Close the image selector modal
  };

  return (
    <div className="row justify-content-center">
      <div className="card-header text-center">
        <Header header="Create Account" />
      </div>
      <div style={{ width: "40rem" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            className="form-control"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            className="form-control"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            className="form-control"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="mt-2 mb-2">
          <label>Profile Picture</label>
          <button type="button" className="btn btn-outline-success" onClick={() => setShowImageSelector(true)}>
            Default Pictures
          </button>
          <input 
            type="file" 
            className="form-control"
            onChange={handleFileChange} // Handle file selection
          />
          {profilePicture && (
            <div>
              <p>Selected Profile Picture:</p>
              <img src={profilePicture} alt="Profile" width="50" height="50" />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-outline-primary">Create Account</button>
      </form>

      {message && <div className="mt-3 text-center text-danger">{message}</div>}

      {/* Image Selector Modal */}
      {showImageSelector && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <h3>Select a Profile Picture</h3>
            <div>
              <img 
                src="https://storage.cloud.google.com/csfca/default1.png" // Reference default image
                alt="Default 1" 
                onClick={() => handleImageSelect('https://storage.cloud.google.com/csfca/default1.png')} 
                style={imageStyle}
              />
              <img 
                src="https://storage.googleapis.com/csfca/default2.png" // Reference default image
                alt="Default 2" 
                onClick={() => handleImageSelect('https://storage.googleapis.com/csfca/default2.png')} 
                style={imageStyle}
              />
              <img 
                src="https://storage.googleapis.com/csfca/default3.png" // Reference default image
                alt="Default 3" 
                onClick={() => handleImageSelect('https://storage.googleapis.com/csfca/default3.png')} 
                style={imageStyle}
              />
            </div>
            <button onClick={() => setShowImageSelector(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

// Add inline styles for modal and images
const modalOverlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  zIndex: 1000, // Ensure the modal is above other content
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 1001, // Modal content should be above overlay
};

const imageStyle = {
  width: '50px',
  height: '50px',
  margin: '10px',
  cursor: 'pointer',
};

export default NewAccount;
