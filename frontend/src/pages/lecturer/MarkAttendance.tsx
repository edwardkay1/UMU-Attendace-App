import { useState } from "react";
import PageWrapper from "../../components/layout/lecturer/PageWrapper";
import Button from "../../components/common/Button";
import { getLecturerById, getCoursesByLecturerId, type Course } from "../../data/mockLecturerData";
import { mockStudents, mockAttendanceRecords } from "../../data/mockStudentData";

export default function LecturerMarkAttendance() {
  // For demo purposes, using the first lecturer
  const currentLecturer = getLecturerById('LEC001');
  const courses = currentLecturer ? getCoursesByLecturerId(currentLecturer.id) : [];

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(courses[0] || null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Get students enrolled in the selected course
  const courseStudents = selectedCourse
    ? mockStudents.filter(student => student.course === selectedCourse.name.split(' ')[0]) // Simple filter based on course name
    : [];

  // Get attendance records for the selected course and date
  const courseAttendance = selectedCourse
    ? mockAttendanceRecords.filter(record =>
        record.subject.toLowerCase().includes(selectedCourse.code.toLowerCase()) &&
        record.date === selectedDate
      )
    : [];

  const getStudentAttendance = (studentId: string) => {
    return courseAttendance.find(record => record.studentId === studentId);
  };

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    // In a real app, this would update the backend
    console.log(`Marking ${studentId} as ${status} for ${selectedCourse?.name} on ${selectedDate}`);
    alert(`Attendance marked: ${status}`);
  };

  const getAttendanceStats = () => {
    const total = courseStudents.length;
    const present = courseAttendance.filter(record => record.status === 'present').length;
    const absent = courseAttendance.filter(record => record.status === 'absent').length;
    const late = courseAttendance.filter(record => record.status === 'late').length;

    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

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
        {/* Header */}
        <div className="p-8 text-white shadow-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">Mark Attendance 👨‍🏫</h1>
              <p className="text-lg text-purple-100">Manage student attendance for your classes</p>
              <p className="mt-2 text-sm text-purple-200">Lecturer: {currentLecturer.name}</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Course and Date Selection */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Course
            </label>
            <select
              value={selectedCourse?.id || ''}
              onChange={(e) => {
                const course = courses.find(c => c.id === e.target.value);
                setSelectedCourse(course || null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Attendance Statistics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Total Students</p>
                <p className="mt-1 text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-green-500 to-green-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-100">Present</p>
                <p className="mt-1 text-3xl font-bold">{stats.present}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-red-500 to-red-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-100">Absent</p>
                <p className="mt-1 text-3xl font-bold">{stats.absent}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-100">Late</p>
                <p className="mt-1 text-3xl font-bold">{stats.late}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Student Attendance Table */}
        <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                Student Attendance - {selectedCourse?.name}
              </h3>
              <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                {selectedDate}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Student
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Current Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courseStudents.map((student) => {
                  const attendance = getStudentAttendance(student.id);
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500">
                              <span className="text-sm font-medium text-white">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.studentId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {attendance ? (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            attendance.status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : attendance.status === 'absent'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">
                            Not Marked
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => markAttendance(student.id, 'present')}
                            className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600"
                          >
                            Present
                          </Button>
                          <Button
                            onClick={() => markAttendance(student.id, 'absent')}
                            className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600"
                          >
                            Absent
                          </Button>
                          <Button
                            onClick={() => markAttendance(student.id, 'late')}
                            className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600"
                          >
                            Late
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {courseStudents.length === 0 && (
            <div className="py-12 text-center">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
              <p className="mt-1 text-sm text-gray-500">No students are enrolled in this course.</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
