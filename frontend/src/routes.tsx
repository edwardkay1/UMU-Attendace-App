import { Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "./pages/student/Dashboard";
import StudentAttendance from "./pages/student/Attendance";
import LecturerDashboard from "./pages/lecturer/Dashboard";
import LecturerClasses from "./pages/lecturer/LecturerClasses";
import LecturerMarkAttendance from "./pages/lecturer/MarkAttendance";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminCourses from "./pages/admin/Courses";
import AdminPageWrapper from "./components/layout/admin/PageWrapper";
import RequireAuth from "./auth/RequireAuth";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <RequireAuth>
            <StudentDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/student/attendance"
        element={
          <RequireAuth>
            <StudentAttendance />
          </RequireAuth>
        }
      />

      {/* Lecturer Routes */}
      <Route
        path="/lecturer/dashboard"
        element={
          <RequireAuth>
            <LecturerDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/lecturer/classes"
        element={
          <RequireAuth>
            <LecturerClasses />
          </RequireAuth>
        }
      />
      <Route
        path="/lecturer/attendance"
        element={
          <RequireAuth>
            <LecturerMarkAttendance />
          </RequireAuth>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth>
            <AdminPageWrapper>
              <AdminDashboard />
            </AdminPageWrapper>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAuth>
            <AdminPageWrapper>
              <AdminUsers />
            </AdminPageWrapper>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <RequireAuth>
            <AdminPageWrapper>
              <AdminCourses />
            </AdminPageWrapper>
          </RequireAuth>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
    </Routes>
  );
}
