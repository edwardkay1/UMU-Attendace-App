import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
  userRole: 'student' | 'lecturer' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, userRole }) => {
  const navigate = useNavigate();

  const getRoleDisplay = () => {
    switch (userRole) {
      case 'student':
        return 'Student Portal';
      case 'lecturer':
        return 'Lecturer Portal';
      case 'admin':
        return 'Admin Portal';
      default:
        return 'Attendance App';
    }
  };

  const getDashboardPath = () => {
    switch (userRole) {
      case 'student':
        return '/student/dashboard';
      case 'lecturer':
        return '/lecturer/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/student/dashboard';
    }
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Mobile menu button */}
            <div className="flex-shrink-0 flex items-center lg:hidden">
              <button
                onClick={onMenuClick}
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Logo and title */}
            <div className="flex-shrink-0 flex items-center">
              <Link to={getDashboardPath()} className="text-xl font-bold text-gray-900">
                {getRoleDisplay()}
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {/* User menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {userRole === 'student' ? 'S' : userRole === 'lecturer' ? 'L' : 'A'}
                </div>
                <span className="text-sm text-gray-700 capitalize">{userRole}</span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
