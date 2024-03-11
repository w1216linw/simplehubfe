"use client";

import FormBtn from "@/components/FormBtn";
import { newCategory } from "@/lib/actions";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

const NewCategory = () => {
  const [state, formAction] = useFormState(newCategory, {
    input: {
      title: "",
      slug: "",
    },
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
        <label htmlFor="slug">Slug</label>
        <input type="text" name="slug" className="bg-gray-100 rounded-lg" />
        <label htmlFor="title">Title</label>
        <input type="text" name="title" className="bg-gray-100 rounded-lg" />
        <FormBtn
          click="Save"
          loading="Loading..."
          style="bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors mt-8"
        />
      </form>
      {state.errors.text && (
        <p className="py-1 text-red-400">{state.errors.text}</p>
      )}
    </div>
  );
};

export default NewCategory;
