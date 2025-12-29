import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  role: "student" | "lecturer" | "admin";
}

const PageWrapper = ({ children, role }: Props) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default PageWrapper;
