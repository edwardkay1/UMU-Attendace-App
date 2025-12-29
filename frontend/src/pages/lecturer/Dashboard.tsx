import PageWrapper from "../../components/layout/lecturer/PageWrapper";
import QRCodeGenerator from "../../components/common/QRCodeGenerator";
import { getLecturerById, getCoursesByLecturerId, getActiveQRSessions, type QRCodeSession } from "../../data/mockLecturerData";
import { useState } from "react";

export default function LecturerDashboard() {
  // For demo purposes, using the first lecturer
  const currentLecturer = getLecturerById('LEC001');
  const courses = currentLecturer ? getCoursesByLecturerId(currentLecturer.id) : [];
  const activeSessions = getActiveQRSessions();

  const [recentSessions, setRecentSessions] = useState<QRCodeSession[]>([]);

  const handleQRGenerated = (session: QRCodeSession) => {
    setRecentSessions(prev => [session, ...prev.slice(0, 4)]); // Keep last 5 sessions
  };

  if (!currentLecturer) {
    return (
      <PageWrapper>
        <div className="py-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-400 to-pink-500">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-lg text-gray-600">Lecturer data not found</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="p-8 text-white shadow-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">Welcome back, {currentLecturer.name.split(' ')[1]}! 👨‍🏫</h1>
              <p className="text-lg text-purple-100">Manage your classes and attendance sessions</p>
              <div className="flex items-center mt-4 space-x-4">
                <span className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                  {currentLecturer.employeeId}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                  {currentLecturer.department}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                  {courses.length} Courses
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Total Courses</p>
                <p className="mt-1 text-3xl font-bold">{courses.length}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-green-500 to-green-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-100">Active Sessions</p>
                <p className="mt-1 text-3xl font-bold">{activeSessions.length}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-100">Today's Classes</p>
                <p className="mt-1 text-3xl font-bold">
                  {courses.reduce((total, course) => total + course.schedule.length, 0)}
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Generator */}
        <QRCodeGenerator
          lecturerId={currentLecturer.id}
          onQRGenerated={handleQRGenerated}
        />

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Recent QR Sessions</h3>
                <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                  Last {recentSessions.length} sessions
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentSessions.map((session) => (
                <div key={session.id} className="p-6 transition-colors hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${session.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{session.courseName}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(session.date).toLocaleDateString()} • {session.time} • {session.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {session.isActive ? 'Active' : 'Expired'}
                      </span>
                      <p className="mt-1 text-xs text-gray-500">
                        Created: {new Date(session.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Courses */}
        <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">My Courses</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {courses.map((course) => (
              <div key={course.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{course.name}</h4>
                    <p className="text-sm text-gray-600">{course.code} • {course.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{course.schedule.length} classes/week</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.schedule.map((schedule) => (
                        <span key={schedule.id} className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded">
                          {schedule.day} {schedule.time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
