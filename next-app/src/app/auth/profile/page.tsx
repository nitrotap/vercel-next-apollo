'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../mutations';
import { QUERY_USER } from '../queries';
import auth from '../authService'; // Import AuthService

interface User {
  name: string;
  email: string;
  avatar: string | null;
  bio: string;
}

const UserProfile: React.FC = () => {
  const { data, loading, error } = useQuery<{ data: { user: User } }>(QUERY_USER);
  const [updateUser] = useMutation<{ updateUser: User }, User>(UPDATE_USER);

  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    avatar: null,
    bio: '',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.loggedIn()) {
      window.location.assign('/login'); // Redirect if not logged in
    } else if (data && data.user) {
      console.log('Fetched user data:', data.user);
      setUser(data.user);
    }
  }, [data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditing = async (): Promise<void> => {
    if (isEditing) {
      // Save changes
      try {
        const { data: updatedData } = await updateUser({
          variables: {
            name: user.name,
            email: user.email,
            avatar: user.avatar || '',
            bio: user.bio,
          },
        });

        if (updatedData?.updateUser) {
          console.log('User updated successfully:', updatedData.updateUser);
          setUser(updatedData.updateUser); // Update local state
        }

        alert('Profile updated successfully');
      } catch (err) {
        console.error('Error updating profile:', err);
        alert('Failed to update profile');
      }
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = (): void => {
    auth.logout(); // Use the logout method from AuthService
    window.location.assign('/login'); // Redirect to login
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching user data:', error);
    return <p>Error loading user data.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={user.avatar || 'https://via.placeholder.com/400'}
            alt="User Avatar"
            className="rounded-full w-32 h-32 object-cover border-2 border-primary"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 file-input file-input-bordered w-full max-w-xs"
              placeholder="Choose an image"
            />
          )}
        </figure>
        <div className="card-body items-center text-center">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs"
                placeholder="Enter your name"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs mt-2"
                placeholder="Enter your email"
              />
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full max-w-xs mt-2"
                placeholder="Tell us about yourself"
              />
            </>
          ) : (
            <>
              <h2 className="card-title text-2xl font-bold">{user.name || 'No Name Set'}</h2>
              <p className="text-sm text-gray-500">{user.email || 'No Email Set'}</p>
              <p className="mt-4 text-base">{user.bio || 'No Bio Added'}</p>
            </>
          )}
          <div className="card-actions mt-6">
            <button className="btn btn-primary" onClick={toggleEditing}>
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            {!isEditing && (
              <button className="btn btn-outline" onClick={handleLogout}>
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
