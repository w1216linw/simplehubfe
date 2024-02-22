import { category } from "@/lib/types";

type SingleCategoryProps = {
  data: category;
};

const SingleCategory = ({ data }: SingleCategoryProps) => {
  return (
    <div className="flex gap-x-1">
      <h1 className=" px-4 py-1 border-4 border-slate-200 bg-slate-200">
        {data.title}
      </h1>
      <button className="border-4 border-slate-200 px-4 py-1 bg-slate-200 active:bg-inherit">
        Edit
      </button>
    </div>
  );
};

export default SingleCategory;
