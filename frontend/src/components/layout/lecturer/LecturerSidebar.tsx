import { Link, useLocation } from "react-router-dom";

interface LecturerSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function LecturerSidebar({ isOpen, onToggle }: LecturerSidebarProps) {
  const location = useLocation();

  const menuItems = [
    { path: "/lecturer/dashboard", label: "Dashboard", icon: "📊", color: "text-purple-400" },
    { path: "/lecturer/classes", label: "My Classes", icon: "📚", color: "text-blue-400" },
    { path: "/lecturer/attendance", label: "Attendance", icon: "📝", color: "text-green-400" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white transition-all duration-300 ease-in-out z-50 shadow-2xl ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        {isOpen && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Attendance
            </h2>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200 group"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-8 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-r-4 border-purple-400 shadow-lg"
                    : "hover:bg-slate-700/30 hover:shadow-md"
                }`}
              >
                <span className={`text-xl mr-3 transition-colors duration-200 ${item.color} group-hover:scale-110`}>
                  {item.icon}
                </span>
                {isOpen && (
                  <span className={`font-medium transition-all duration-200 ${
                    location.pathname === item.path ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}>
                    {item.label}
                  </span>
                )}
                {location.pathname === item.path && isOpen && (
                  <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      {isOpen && (
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Lecturer Portal</p>
                <p className="text-xs text-slate-400">v1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}