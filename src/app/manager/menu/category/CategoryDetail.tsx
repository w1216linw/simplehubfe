"use client";

import FormBtn from "@/components/FormBtn";
import { editCategory } from "@/lib/actions";
import { category } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

const CategoryDetail = ({ category }: { category: category }) => {
  const [state, formAction] = useFormState(editCategory, {
    input: "",
    errors: { text: undefined },
  });
  const [showError, setShowError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!state.errors.text && formRef.current) formRef.current.reset();
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
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col py-4 gap-3 w-full"
        action={formAction}
        ref={formRef}
      >
        <input
          name="id"
          type="text"
          value={category.id}
          readOnly
          className="hidden"
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="bg-gray-100 rounded-lg"
          defaultValue={category.title}
        />
        <FormBtn
          click="Save"
          loading="Loading..."
          style="bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors mt-8"
        />
      </form>
      {showError && <p className="py-1 text-red-400">{state.errors.text}</p>}
    </div>
  );
};

export default CategoryDetail;
