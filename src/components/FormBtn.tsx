"use client";
import { useFormStatus } from "react-dom";

type FormBtnProps = {
  click: string;
  loading: string;
};

const FormBtn = ({ click, loading }: FormBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="px-2 py-1 bg-white"
    >
      {pending ? loading : click}
    </button>
  );
};

export default FormBtn;
