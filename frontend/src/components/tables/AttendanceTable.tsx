import React from "react";
import { AttendanceRecord } from "../../types/attendance";
import StatusBadge from "../common/StatusBadge";

interface Props {
  data: AttendanceRecord[];
}

const AttendanceTable = ({ data }: Props) => {
  return (
    <table className="min-w-full overflow-hidden bg-white rounded shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Date</th>
          <th className="p-2">Course</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record) => (
          <tr key={record.id} className="border-b">
            <td className="p-2">{record.date}</td>
            <td className="p-2">{record.course}</td>
            <td className="p-2">
              <StatusBadge status={record.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
