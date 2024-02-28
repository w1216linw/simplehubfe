"use client";
import { useFormStatus } from "react-dom";

type FormBtnProps = {
  click: string;
  loading: string;
  style?: string;
};

const FormBtn = ({ style, click, loading }: FormBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      type="submit"
      className={`${style} px-2 py-1 `}
    >
      {pending ? loading : click}
    </button>
  );
};

export default FormBtn;
