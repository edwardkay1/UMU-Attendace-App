import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: '📊'
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: '👥'
    },
    {
      name: 'Courses',
      path: '/admin/courses',
      icon: '📚'
    },
    {
      name: 'Reports',
      path: '/admin/reports',
      icon: '📈'
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: '⚙️'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                    onClick={() => {
                      // Close sidebar on mobile after navigation
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">System Admin</p>
              <p className="text-xs text-gray-500 truncate">admin@university.edu</p>
            </div>
          </div>
          <button className="mt-3 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;