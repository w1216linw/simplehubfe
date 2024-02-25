"use client";

import { category } from "@/lib/types";
import { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";
const Categories = () => {
  const [categories, setCategories] = useState<category[]>();
  const [error, setError] = useState<string | null>(null);
  const [curPage, setCurPage] = useState(1);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [totalPages, setTotalPages] = useState(-1);

  const getCategories = async (page: number) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_URL + `/api/categories?page=${page}`
      );
      if (!res.ok) {
        throw new Error("Error fetching categories");
      } else {
        const data = await res.json();
        if (totalPages < 0) setTotalPages(Math.ceil(data.count / 12));
        setCategories(data.results);
        setPrev(!data.previous);
        setNext(!data.next);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error fetching categories");
    }
  };
  useEffect(() => {
    getCategories(curPage);
  }, [curPage, setCurPage]);
  return (
    <div className="flex flex-col h-full">
      {error ? (
        <h3>{error}</h3>
      ) : categories && categories.length >= 1 ? (
        <>
          <div className="grid grid-cols-3 mb-auto">
            {categories.map((elem) => (
              <SingleCategory data={elem} key={elem.title} />
            ))}
          </div>

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
        <h3>No categories</h3>
      )}
    </div>
  );
};

export default Categories;
