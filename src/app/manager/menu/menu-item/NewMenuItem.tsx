"use client";
import FormBtn from "@/components/FormBtn";
import { newMenuItem } from "@/lib/actions";
import { useFetch } from "@/lib/hooks";
import { category } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
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
  const [showError, setShowError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [select, setSelect] = useState<category>();

  const handleClear = () => {
    if (formRef.current) {
      setSelect(undefined);
      formRef.current.reset();
    }
  };

  useEffect(() => {
    if (!state.errors.text && formRef.current) {
      handleClear();
    }
  }, [state]);

  useEffect(() => {
    if (state.errors.text) setShowError(true);
    let timer = setInterval(() => {
      setShowError(false);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [state.errors.text]);

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="h-max">
          <form
            ref={formRef}
            action={formAction}
            className="flex flex-col py-4 gap-3 w-96"
          >
            <div className="flex flex-col">
              <label htmlFor="title">Title</label>
              <input
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
                type="text"
                name="price"
                id="price"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category">Category</label>
              <Select
                options={categories}
                more={moreItems}
                hasMore={hasMore}
                select={select}
                setSelect={setSelect}
              />
            </div>
            <div className="space-x-4 flex items-center">
              <label htmlFor="featured">Featured</label>
              <input type="checkbox" name="featured" id="featured" />
            </div>
            <div>
              <button
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  handleClear();
                }}
              >
                Clear Entry
              </button>
            </div>
            <FormBtn
              click="Save"
              loading="Loading..."
              style="bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors mt-8"
            />
          </form>
          <p className="text-center text-red-400">
            {showError && state.errors.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default NewMenuItem;
