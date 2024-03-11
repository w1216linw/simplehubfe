import React from "react";
import Navbar from "./Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default UserLayout;
