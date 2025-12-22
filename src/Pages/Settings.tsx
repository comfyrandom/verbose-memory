import React from 'react';

const Settings: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
                <p className="text-gray-400 text-sm">Configure your application settings</p>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <p className="text-gray-300">Settings content will go here...</p>
            </div>
        </div>
    );
};

export default Settings;