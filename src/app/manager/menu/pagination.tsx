"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

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
    <div className="flex justify-center mt-auto h-max items-center">
      <button
        disabled={page === 1}
        className="disabled:text-gray-400 flex items-center font-semibold"
        onClick={() => handleClick(page - 1)}
      >
        <MdNavigateBefore />
        prev
      </button>
      <div className="mx-4">
        {page} / {totalPages}
      </div>
      <button
        disabled={page === totalPages}
        className="disabled:text-gray-400 flex items-center font-semibold "
        onClick={() => handleClick(page + 1)}
      >
        next
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Pagination;
