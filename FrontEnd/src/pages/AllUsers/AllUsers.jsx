import React, { useEffect, useState } from 'react';
import { UserApi } from '../../api/user';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await UserApi.getAllUsers();
      if (response.statusCode === 200) {
        setUsers(response.data);
      } else {
        setError(response.data.error);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Verified: {user.is_verified ? 'Yes' : 'No'}</p>
            <p>Role: {user.role}</p>
            <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
            {user.image && <img src={user.image} alt={`${user.username}'s profile`} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;