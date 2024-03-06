"use client";

const error = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <h1 className="font-bold text-2xl">Server Error</h1>
      <p className="font-semibold">
        Something went wrong, please try again later
      </p>
    </div>
  );
};

export default error;
