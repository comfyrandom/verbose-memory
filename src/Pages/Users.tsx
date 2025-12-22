import React from 'react';

const Users: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-1">User Management</h1>
                <p className="text-gray-400 text-sm">Manage user accounts and permissions</p>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <p className="text-gray-300">User management content will go here...</p>
            </div>
        </div>
    );
};

export default Users;