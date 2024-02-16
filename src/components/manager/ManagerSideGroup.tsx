import { getSession, logout } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ManagerSideGroupWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="manager-side-group-wrapper">{children}</div>;
};

const ManagerSideGroup = () => {
  const session = getSession();

  return (
    <div className="h-full w-80 p-20 flex flex-col gap-5 border-r-2 border-gray-200">
      <ManagerSideGroupWrapper>
        <h1>Menu</h1>
        <ul>
          <li>
            <Link href="/manager/menu/category">Category</Link>
          </li>
          <li>
            <Link href="/manager/menu/menu-item">Menu Item</Link>
          </li>
        </ul>
      </ManagerSideGroupWrapper>
      <ManagerSideGroupWrapper>
        <h1>Customers</h1>
        <ul>
          <li>Orders</li>
          <li>Inquiry</li>
        </ul>
      </ManagerSideGroupWrapper>
      <ManagerSideGroupWrapper>
        <h1>Delivery Crews</h1>
        <ul>
          <li>Orders</li>
          <li>Inquiry</li>
        </ul>
      </ManagerSideGroupWrapper>
      <div className="mt-auto flex gap-2">
        <pre>{session?.username}</pre>
        <form
          action={async () => {
            "use server";
            logout();
            redirect("/");
          }}
        >
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerSideGroup;
