"use client";
import { authenticate } from "@/lib/actions";
import { useFormStatus } from "react-dom";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${
        pending && "bg-gray-400 bg-opacity-40"
      } py-2 px-4 rounded-sm border border-white w-20 self-center mt-4"`}
      type="submit"
      aria-disabled={pending}
    >
      Login
    </button>
  );
};

const Login = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <form
        className="flex flex-col w-[min(100%,16rem)] p-2 space-y-2"
        action={authenticate}
      >
        <label htmlFor="username" className="text-lg">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="py-1 px-2 "
        />
        <label htmlFor="password" className="text-lg">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="py-1 px-2  "
        />
        <SubmitBtn />
      </form>
    </main>
  );
};

export default Login;
