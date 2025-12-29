import { Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "./pages/student/Dashboard";
import StudentAttendance from "./pages/student/Attendance";
import RequireAuth from "./auth/RequireAuth";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RequireAuth role="student" />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/student/dashboard" />} />
    </Routes>
  );
}
