"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-5 bg-gray-50 font-bold text-lg">
      <Link
        href="/user"
        className={`link ${pathname === "/user" ? "active" : ""}`}
      >
        Home
      </Link>
      <Link
        href="/user/menu"
        className={`link ${pathname.match(/^\/user\/menu/g) ? "active" : ""}`}
      >
        Menu
      </Link>
    </div>
  );
};

export default Navbar;
