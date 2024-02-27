import { category } from "@/lib/types";

type SingleCategoryProps = {
  data: category;
};

const SingleCategory = ({ data }: SingleCategoryProps) => {
  return (
    <div className="flex items-center gap-2">
      <h1 className="">{data.title}</h1>
      <button className="">E</button>
    </div>
  );
};

export default SingleCategory;
