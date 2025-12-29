import React from "react";
import AttendanceStat from "../../components/cards/AttendanceStat";
import CourseCard from "../../components/cards/CourseCard";
import AttendanceTable from "../../components/tables/AttendanceTable";
import { mockStudent, mockAttendance } from "../../data/mockStudentData";
import PageWrapper from "../../components/layout/PageWrapper";

const Dashboard = () => {
  return (
    <PageWrapper role="student">
      <h1 className="mb-4 text-2xl font-bold">Welcome, {mockStudent.name}</h1>

      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        {mockStudent.courses.map((course) => (
          <AttendanceStat
            key={course}
            course={course}
            attendance={Math.floor(Math.random() * 100)} // mock %
          />
        ))}
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">Attendance History</h2>
        <AttendanceTable data={mockAttendance} />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
