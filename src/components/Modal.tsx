"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const key = searchParams.get(title);
  const router = useRouter();

  const formatTitle = (title: string) => {
    return title.replace(/-|[0-9]/gm, " ");
  };

  useEffect(() => {
    if (key === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [key]);

  return (
    <dialog ref={dialogRef} className="p-4 rounded-md  w-[min(25rem,100%)] ">
      <div className="flex justify-between">
        <h1 className="capitalize font-semibold">{formatTitle(title)}</h1>
        <button onClick={() => router.back()}>
          <MdClose />
        </button>
      </div>
      <div className="overflow-hidden">{children}</div>
    </dialog>
  );
};

export default Modal;
