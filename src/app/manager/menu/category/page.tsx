"use client";
import Categories from "@/components/manager/menu/Categories";
import FormBtn from "@/components/reuse/FormBtn";
import { newCategory } from "@/lib/actions";
import React, { useState } from "react";

const CategoryPage = () => {
  const [open, setOpen] = useState<Boolean>(false);
  return (
    <div className="relative">
      <div className="flex mb-2">
        <button onClick={() => setOpen(true)}>Create new category</button>
      </div>
      <CategoriesMemoized />
      <div className={`absolute ${!open && "hidden"}`}>
        <button className="absolute" onClick={() => setOpen(false)}>
          X
        </button>
        <form action={newCategory}>
          <input type="text" />
          <FormBtn click="Submit" loading="loading..." />
        </form>
      </div>
    </div>
  );
};

const CategoriesMemoized = React.memo(Categories);

export default CategoryPage;
