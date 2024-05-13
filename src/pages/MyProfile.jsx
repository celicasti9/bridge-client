import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Sidebar from '../components/Sidebar';
import { SERVER_URL } from '../services/SERVER_URL'
import { fileChange } from '../services/fileChange';

function MyProfile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState(''); // For displaying image preview
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users/${user._id}`);
    
      const userData = response.data;
      console.log("this is the user data", userData)
      setName(userData.name);
      setEmail(userData.email);
      if (userData.avatar) {
        setAvatarUrl(userData.avatar); // Set avatar URL for image preview
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPhoto

    if (avatarUrl) {
      newPhoto = avatarUrl
    } else {
      newPhoto = user.avatar
    }


    const updatedUser = { name, email, password, avatar: newPhoto }

    // if (image) {
    //   formData.append('avatar', image); // Append the image file to formData
    // }

    try {
      const response = await axios.put(`${SERVER_URL}/users/update/${user._id}`, updatedUser);
      console.log(response.data);
      navigate("/dashboard");
    } catch ( error ) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {

    setDisabled(true)

    fileChange(e)
      .then((response) => {
        setAvatarUrl(response.data.image)
        setDisabled(false)
      })
      .catch((err) => {
        console.log("Errror uploading photo", err)
        setDisabled(false)
      })

  };

  return (
    <>
      <Sidebar />
      <div className="flex-1 ml-64 p-10">
        <h1 className="ml-4 text-2xl font-bold text-gray-800 mt-6 mb-4">Edit Profile</h1>
        {avatarUrl && (
          <img src={avatarUrl} alt="User Avatar" className="mb-4 rounded-full w-24 h-24 object-cover" />
        )}
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-sm font-medium mb-1">Avatar:</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full"
              onChange={handleImageChange}
            />
          </div>
          <button disabled={disabled} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
        </form>
      </div>
    </>
  );
}

export default MyProfile;
