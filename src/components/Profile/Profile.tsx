import React, { useState } from 'react';
import './Profile.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { update } from '../../services/user-service';

const Profile: React.FC = () => {
  // Retrieve user details from local storage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [imgUrl, setImgUrl] = useState(user.imgUrl);

  const handleEdit = () => {
    setEditMode(true);  
  };

  const handleCancel = () => {
    setEditMode(false);
    setName(user.name); 
    setEmail(user.email);
    setImgUrl(user.imgUrl);
  };

  const handleSubmit = async () => {
    localStorage.setItem('user', JSON.stringify({ ...user, name, email, imgUrl }));
    setUser({ ...user, name, email, imgUrl });
    setEditMode(false);
    await update(user)
    setUser(user)
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-details">
        {editMode ? (
          <div>
          <label className='form-label'>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className='form-label'>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='form-label'>Profile Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        
        ) : (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {user.imgUrl && <img src={user.imgUrl} alt="Profile" className="profile-image" />}
          </div>
        )}
      </div>
      {editMode ? (
        <div className="profile-actions1">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="profile-actions">
          <button onClick={handleEdit}>Edit</button>

        </div>
      )}
      <div className="back-link">
      <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}> Back
       </Link>
      </div>
    </div>
  );
};

export default Profile;
