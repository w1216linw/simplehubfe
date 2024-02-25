"use client";

import FormBtn from "@/components/FormBtn";
import type { LoginStateProp } from "@/lib/actions";
import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

const Login = () => {
  const [state, formAction] = useFormState(authenticate, {
    username: "",
    password: "",
    errors: { text: undefined },
  } as LoginStateProp);

  return (
    <main className="flex flex-col h-screen w-screen items-center justify-center">
      <form
        className="flex flex-col w-[min(100%,16rem)] p-2 space-y-2"
        action={formAction}
      >
        {state?.errors.text && (
          <div className="w-full text-center border-t-4 border-red-200 bg-gray-50 h-12 grid place-content-center">
            {state.errors.text}
          </div>
        )}
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
        <FormBtn click="Login" loading="loading..." />
      </form>
    </main>
  );
};

export default Login;
