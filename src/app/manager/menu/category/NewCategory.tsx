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

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!state.errors.text && inputRef.current) inputRef.current.value = "";
  }, [state]);

  return (
    <div className="flex flex-col items-center">
      <form className=" w-[min(40rem,100%)] flex " action={formAction}>
        <input
          ref={inputRef}
          type="text"
          name="title"
          className="flex-1 px-2 py-1 outline-0"
        />
        <FormBtn click="Submit" loading="Saving..." />
      </form>
      {state.errors.text && (
        <p className="py-1 text-red-400">{state.errors.text}</p>
      )}
    </div>
  );
};

export default NewCategory;
