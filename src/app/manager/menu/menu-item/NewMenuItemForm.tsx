"use client";
import FormBtn from "@/components/FormBtn";
import { newMenuItem } from "@/lib/actions";
import { useFetch } from "@/lib/hooks";
import { category } from "@/lib/types";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import Select from "./Select";

const NewMenuItemForm = () => {
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
        <div>
          <form action={formAction} className="flex">
            <label htmlFor="title">Title</label>
            <input ref={titleRef} type="text" name="title" id="title" />
            <label htmlFor="price">Price</label>
            <input ref={priceRef} type="text" name="price" id="price" />
            <Select options={categories} more={moreItems} hasMore={hasMore} />
            <FormBtn click="Save" loading="Loading..." />
          </form>
          <p>{state && state.errors.text}</p>
        </div>
      )}
    </div>
  );
};

export default NewMenuItemForm;
