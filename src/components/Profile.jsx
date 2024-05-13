import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Sidebar from '../components/Sidebar';
import MyProfile from '../components/MyProfile'; // Import the MyProfile component

function Profile() {
  // Assuming you have access to the user object from your AuthContext or elsewhere
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const SERVER_URL = "http://localhost:4000";

  return (
    <>
      <Sidebar />
      <MyProfile user={user} /> {/* Pass the user object to the MyProfile component */}
    </>
  );
}

export default Profile;
