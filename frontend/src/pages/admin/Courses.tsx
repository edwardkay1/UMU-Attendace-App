import React, { useState } from 'react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockStudents } from '../../data/mockStudentData';
import { mockCourses } from '../../data/mockLecturerData';
import { getCourseStats } from '../../data/mockAdminData';
import { Course } from '../../types/lecturer';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const courseStats = getCourseStats();

  const getFilteredCourses = () => {
    if (searchTerm) {
      return mockCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return mockCourses;
  };

  const getCourseStatsById = (courseId: string) => {
    return courseStats.find(stat => stat.courseId === courseId);
  };

  const formatSchedule = (schedule: Course['schedule']) => {
    return schedule.map(s => `${s.day} ${s.time} (${s.location})`).join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="mt-1 text-gray-600">Manage courses, schedules, and enrollment</p>
        </div>
        <button className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          Add New Course
        </button>
      </div>

      {/* Search */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="max-w-md">
          <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
            Search Courses
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, code, or lecturer..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getFilteredCourses().map((course) => {
          const stats = getCourseStatsById(course.id);
          return (
            <div key={course.id} className="p-6 transition-shadow bg-white border rounded-lg shadow-sm hover:shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.code}</p>
                </div>
                <StatusBadge status="success">Active</StatusBadge>
              </div>

              <div className="mb-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Lecturer</p>
                  <p className="text-sm font-medium text-gray-900">{course.lecturer}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Schedule</p>
                  <p className="text-sm text-gray-900">{formatSchedule(course.schedule)}</p>
                </div>

                {stats && (
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Students</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.totalStudents}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Attendance</p>
                      <p className="text-lg font-semibold text-green-600">{stats.averageAttendance}%</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 text-sm font-medium text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {getFilteredCourses().length === 0 && (
        <div className="p-12 text-center bg-white border rounded-lg shadow-sm">
          <p className="text-gray-500">No courses found matching your search.</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">System Summary</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{mockCourses.length}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {courseStats.reduce((sum, stat) => sum + stat.totalStudents, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Enrollments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(courseStats.reduce((sum, stat) => sum + stat.averageAttendance, 0) / courseStats.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Attendance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {courseStats.filter(stat => stat.averageAttendance < 75).length}
            </div>
            <div className="text-sm text-gray-600">Low Attendance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
