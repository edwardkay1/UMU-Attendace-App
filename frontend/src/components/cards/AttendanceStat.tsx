import React from "react";

interface Props {
  course: string;
  attendance: number; // 0-100
}

const AttendanceStat = ({ course, attendance }: Props) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold">{course}</h3>
      <p className="mt-2 text-xl font-bold">{attendance}% Attendance</p>
    </div>
  );
};

export default AttendanceStat;
