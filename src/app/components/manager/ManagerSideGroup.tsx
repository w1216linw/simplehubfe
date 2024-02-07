import Link from "next/link";
import { ReactNode } from "react";

const ManagerSideGroupWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="manager-side-group-wrapper">{children}</div>;
};

const ManagerSideGroup = () => {
  return (
    <div className="h-full w-80 p-20 flex flex-col gap-5">
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
    </div>
  );
};

export default ManagerSideGroup;
