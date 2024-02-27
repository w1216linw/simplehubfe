"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

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
    return title.replace(/-/g, " ");
  };

  useEffect(() => {
    if (key === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [key]);

  return (
    <dialog ref={dialogRef} className="p-2 rounded-md">
      <div className="flex justify-between">
        <h1 className="capitalize">{formatTitle(title)}</h1>
        <button onClick={() => router.back()}>X</button>
      </div>
      <div>{children}</div>
    </dialog>
  );
};

export default Modal;
