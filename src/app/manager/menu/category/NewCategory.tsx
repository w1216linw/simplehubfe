"use client";

import FormBtn from "@/components/FormBtn";
import { newCategory } from "@/lib/actions";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

const NewCategory = () => {
  const [state, formAction] = useFormState(newCategory, {
    input: "",
    errors: { text: undefined },
  });

  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!state.errors.text && formRef.current) formRef.current.reset();
  }, [state]);

  return (
    <div className="flex flex-col items-center">
      <form
        className=" w-[min(40rem,100%)] flex flex-col py-4 gap-3"
        action={formAction}
        ref={formRef}
      >
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
