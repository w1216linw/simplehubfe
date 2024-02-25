"use client";
import { menuItem } from "@/lib/types";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState<menuItem[]>([]);
  const [error, setError] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [totalPages, setTotalPages] = useState(-1);

  const getMenuItems = async (page: number) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_URL + `/api/menu-items?page=${page}`
      );
      if (!res.ok) {
        throw new Error("Error fetching menu items");
      } else {
        const data = await res.json();
        if (totalPages < 0) setTotalPages(Math.ceil(data.count / 12));
        setMenuItems(data.results);
        setPrev(!data.previous);
        setNext(!data.next);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error fetching menu items");
    }
  };

  useEffect(() => {
    getMenuItems(curPage);
  }, [curPage, setCurPage]);

  return (
    <div className="w-full">
      {error ? (
        <h3>{error}</h3>
      ) : menuItems.length > 1 ? (
        <>
          <table className="w-full">
            <thead>
              <tr>
                <td>Title</td>
                <td>Category</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((elem) => (
                <MenuItem menuItem={elem} key={elem.id} />
              ))}
            </tbody>
          </table>
          <div className="flex justify-center gap-x-10">
            <button
              className="bg-gray-600 text-neutral-50 px-4 py-1 rounded-xl"
              disabled={prev}
              onClick={() => setCurPage(curPage - 1)}
            >
              prev
            </button>
            <div>
              {curPage} / {totalPages}
            </div>
            <button
              className="bg-gray-600 text-neutral-50 px-4 py-1 rounded-xl"
              disabled={next}
              onClick={() => setCurPage(curPage + 1)}
            >
              next
            </button>
          </div>
        </>
      ) : (
        <h3>No items found</h3>
      )}
    </div>
  );
};

export default MenuItems;
