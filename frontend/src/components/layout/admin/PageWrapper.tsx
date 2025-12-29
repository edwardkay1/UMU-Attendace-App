import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Navbar from '../Navbar';

interface AdminPageWrapperProps {
  children: React.ReactNode;
}

const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuClick={toggleSidebar} userRole="admin" />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPageWrapper;