"use client";
import { menuItem } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MenuItemDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [detail, setDetail] = useState<menuItem>();
  useEffect(() => {
    if (!id) return;

    fetch(process.env.NEXT_PUBLIC_URL + `/api/menu-items/${id}`)
      .then((res) => res.json())
      .then((data) => setDetail(data));
  }, [id]);
  return (
    <div>
      {id}
      {detail?.title}
    </div>
  );
};

export default MenuItemDetail;
