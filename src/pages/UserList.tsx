import React, { useEffect } from 'react';
import { addUser, fetchUsers } from '../api/services/user.service';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.user);

  console.log('UserList', users);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, search: 'users' }));
  }, [loading, dispatch]);

  const handleAddUser = () => {
    dispatch(addUser({ name: 'New User', email: 'newuser@example.com' }));
  };

  const handleRemoveUser = (id: number) => {
    console.log('Removing user with id:', id);
  };

  return (
    <div>
      <button onClick={handleAddUser}>Add User</button>
      {users.map((user: any) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
