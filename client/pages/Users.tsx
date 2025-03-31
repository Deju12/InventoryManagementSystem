import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleAddUser = () => {
        if (newUser.name && newUser.email) {
            const newUserObj: User = {
                id: users.length + 1,
                name: newUser.name,
                email: newUser.email,
            };
            setUsers([...users, newUserObj]);
            setNewUser({ name: '', email: '' });
        }
    };

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
    };

    const handleUpdateUser = () => {
        if (editingUser) {
            setUsers(
                users.map((user) =>
                    user.id === editingUser.id ? editingUser : user
                )
            );
            setEditingUser(null);
        }
    };

    return (
        <div>
            <h1>Users Management</h1>

            {/* Add User Form */}
            <div style={{ marginBottom: '20px' }}>
                <h2>Add User</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>

            {/* Edit User Form */}
            {editingUser && (
                <div style={{ marginBottom: '20px' }}>
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) =>
                            setEditingUser({ ...editingUser, name: e.target.value })
                        }
                    />
                    <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) =>
                            setEditingUser({ ...editingUser, email: e.target.value })
                        }
                    />
                    <button onClick={handleUpdateUser}>Update User</button>
                </div>
            )}

            {/* Users Table */}
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEditUser(user)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;