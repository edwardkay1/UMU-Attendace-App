import React from 'react';
import { AttendanceStat } from '../../components/cards/AttendanceStat';
import { StatusBadge } from '../../components/common/StatusBadge';
import { getSystemStats, getRecentActivity, getCourseStats } from '../../data/mockAdminData';
import { ActivityLog } from '../../types/admin';

const AdminDashboard: React.FC = () => {
  const systemStats = getSystemStats();
  const recentActivity = getRecentActivity(5);
  const courseStats = getCourseStats();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'attendance_marked':
        return 'bg-green-100 text-green-800';
      case 'qr_generated':
        return 'bg-blue-100 text-blue-800';
      case 'user_created':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and management</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Generate Report
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            System Settings
          </button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AttendanceStat
          title="Total Students"
          value={systemStats.totalStudents}
          icon="👥"
          trend="+5%"
          trendUp={true}
        />
        <AttendanceStat
          title="Total Lecturers"
          value={systemStats.totalLecturers}
          icon="👨‍🏫"
          trend="+2%"
          trendUp={true}
        />
        <AttendanceStat
          title="Active Courses"
          value={systemStats.totalCourses}
          icon="📚"
          trend="0%"
          trendUp={false}
        />
        <AttendanceStat
          title="Active QR Sessions"
          value={systemStats.activeQRSessions}
          icon="📱"
          trend="+10%"
          trendUp={true}
        />
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            <p className="text-gray-600 mt-1">Overall system status and performance</p>
          </div>
          <StatusBadge status={systemStats.systemHealth === 'healthy' ? 'success' : 'warning'}>
            {systemStats.systemHealth.toUpperCase()}
          </StatusBadge>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{systemStats.totalAttendanceRecords}</div>
            <div className="text-sm text-gray-600">Attendance Records</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">&lt;50ms</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity: ActivityLog) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.userType === 'student' ? 'bg-green-500' :
                    activity.userType === 'lecturer' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {activity.userType}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getActionColor(activity.action)}`}>
                      {activity.action.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatTimestamp(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
          <div className="space-y-4">
            {courseStats.slice(0, 5).map((course) => (
              <div key={course.courseId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{course.courseName}</h4>
                  <p className="text-xs text-gray-600">{course.totalStudents} students</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{course.averageAttendance}%</div>
                  <div className="text-xs text-gray-600">attendance</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <span className="text-2xl">👤</span>
            <span className="text-sm font-medium text-gray-700">Add New User</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <span className="text-2xl">📚</span>
            <span className="text-sm font-medium text-gray-700">Create Course</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <span className="text-2xl">📊</span>
            <span className="text-sm font-medium text-gray-700">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
