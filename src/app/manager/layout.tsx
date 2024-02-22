import ManagerSideGroup from "@/app/manager/ManagerSideGroup";
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
    <div className="flex">
      <ManagerSideGroup />
      {children}
    </div>
  );
}
