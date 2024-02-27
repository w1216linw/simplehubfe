"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  counts,
  totalPages,
}: {
  counts: number;
  totalPages: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const { replace } = useRouter();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleClick = (page: number) => {
    replace(createPageUrl(page));
  };

  console.log(totalPages, counts);
  return (
    <div className="flex justify-center">
      <button
        disabled={page === 1}
        className="bg-gray-600 text-neutral-50 px-4 py-1 rounded-xl"
        onClick={() => handleClick(page - 1)}
      >
        prev
      </button>
      <div>
        {page} / {totalPages}
      </div>
      <button
        disabled={page === totalPages}
        className="bg-gray-600 text-neutral-50 px-4 py-1 rounded-xl"
        onClick={() => handleClick(page + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
