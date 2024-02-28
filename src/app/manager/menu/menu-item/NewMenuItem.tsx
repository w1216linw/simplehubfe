"use client";
import FormBtn from "@/components/FormBtn";
import { newMenuItem } from "@/lib/actions";
import { useFetch } from "@/lib/hooks";
import { category } from "@/lib/types";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import Select from "./Select";

const NewMenuItem = () => {
  const [categories, error, hasMore, moreItems] =
    useFetch<category>("/api/categories");

  const [state, formAction] = useFormState(newMenuItem, {
    title: "",
    price: "",
    errors: { text: undefined },
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!state.errors.text && titleRef.current && priceRef.current) {
      titleRef.current.value = "";
      priceRef.current.value = "";
    }
  }, [state]);

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="h-max">
          <form action={formAction} className="flex flex-col py-4 gap-3 w-96">
            <div className="flex flex-col">
              <label htmlFor="title">Title</label>
              <input
                ref={titleRef}
                type="text"
                name="title"
                id="title"
                className="bg-gray-100 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                className="bg-gray-100 rounded-lg"
                ref={priceRef}
                type="text"
                name="price"
                id="price"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category">Category</label>
              <Select options={categories} more={moreItems} hasMore={hasMore} />
            </div>
            <div className="space-x-4 flex items-center">
              <label htmlFor="featured">Featured</label>
              <input type="checkbox" name="featured" id="featured" />
            </div>
            <FormBtn
              click="Save"
              loading="Loading..."
              style="bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors mt-8"
            />
          </form>
          <p>{state && state.errors.text}</p>
        </div>
      )}
    </div>
  );
};

export default NewMenuItem;
