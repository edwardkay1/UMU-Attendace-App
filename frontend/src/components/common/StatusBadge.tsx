import React from "react";
interface Props {
  status: "present" | "absent";
}

const StatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`px-2 py-1 rounded text-white text-sm ${
        status === "present" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
