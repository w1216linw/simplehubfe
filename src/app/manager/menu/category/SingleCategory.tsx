import { category } from "@/lib/types";

type SingleCategoryProps = {
  data: category;
};

const SingleCategory = ({ data }: SingleCategoryProps) => {
  return (
    <div className="flex items-center gap-2">
      <button className="">E</button>
      <h1 className="">{data.title}</h1>
    </div>
  );
};

export default SingleCategory;
