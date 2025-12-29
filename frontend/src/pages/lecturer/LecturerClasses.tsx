import PageWrapper from "../../components/layout/lecturer/PageWrapper";
import { getLecturerById, getCoursesByLecturerId } from "../../data/mockLecturerData";

export default function LecturerClasses() {
  // For demo purposes, using the first lecturer
  const currentLecturer = getLecturerById('LEC001');
  const courses = currentLecturer ? getCoursesByLecturerId(currentLecturer.id) : [];

  if (!currentLecturer) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">Lecturer data not found</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="p-8 text-white shadow-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">My Classes 📚</h1>
              <p className="text-lg text-purple-100">View and manage your course schedules</p>
              <p className="text-purple-200 text-sm mt-2">Lecturer: {currentLecturer.name}</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{course.code.charAt(0)}</span>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    {course.department}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.code}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {course.schedule.length} sessions per week
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Schedule:</h4>
                    <div className="space-y-1">
                      {course.schedule.map((schedule) => (
                        <div key={schedule.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{schedule.day}</span>
                          <span className="text-gray-600">{schedule.time}</span>
                          <span className="text-gray-600">{schedule.location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                    View Details
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                    Generate QR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No courses assigned</h3>
            <p className="text-gray-500">You don't have any courses assigned yet.</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12l3-3m-3 3l-3-3m-3 7h2.99M9 12H5m0 0v4" />
                </svg>
                <span className="font-medium">Generate QR Code</span>
              </div>
            </button>

            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="font-medium">Mark Attendance</span>
              </div>
            </button>

            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">View Reports</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}