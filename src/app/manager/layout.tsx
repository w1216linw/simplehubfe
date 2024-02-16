import ManagerSideGroup from "@/components/manager/ManagerSideGroup";
import type { Metadata } from "next";

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
