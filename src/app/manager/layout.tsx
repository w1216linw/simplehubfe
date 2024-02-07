import type { Metadata } from "next";
import ManagerSideGroup from "../components/manager/ManagerSideGroup";

export const metadata: Metadata = {
  title: "Manager",
  description: "Manager site",
};

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <ManagerSideGroup />
      {children}
    </div>
  );
}
