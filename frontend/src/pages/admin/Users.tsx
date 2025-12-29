import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockStudents } from '../../data/mockStudentData';
import { mockLecturers } from '../../data/mockLecturerData';
import { mockAdmins } from '../../data/mockAdminData';
import { Student, Lecturer, Admin } from '../../types/admin';

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'lecturers' | 'admins'>('students');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'students', label: 'Students', count: mockStudents.length },
    { id: 'lecturers', label: 'Lecturers', count: mockLecturers.length },
    { id: 'admins', label: 'Admins', count: mockAdmins.length }
  ];

  const getFilteredUsers = () => {
    let users: (Student | Lecturer | Admin)[] = [];

    switch (activeTab) {
      case 'students':
        users = mockStudents;
        break;
      case 'lecturers':
        users = mockLecturers;
        break;
      case 'admins':
        users = mockAdmins;
        break;
    }

    if (searchTerm) {
      return users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return users;
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'student':
        return 'bg-green-100 text-green-800';
      case 'lecturer':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderUserTable = () => {
    const users = getFilteredUsers();

    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {activeTab} Management
            </h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Add New {activeTab.slice(0, -1)}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {activeTab === 'students' && 'course' in user && user.course}
                      {activeTab === 'lecturers' && 'department' in user && user.department}
                      {activeTab === 'admins' && 'role' in user && user.role}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {user.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status="success">Active</StatusBadge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found matching your search.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage students, lecturers, and administrators</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="max-w-md">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Users
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderUserTable()}
        </div>
      </div>
    </div>
  );
};

export default Users;
