import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewUser = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      {/* Render other user details as needed */}
    </div>
  );
};

export default ViewUser;
