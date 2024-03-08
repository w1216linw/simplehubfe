import { category } from "@/lib/types";
import { urlBuilder } from "@/lib/utils";
import Link from "next/link";
import { SearchParams } from "../page";

type SingleCategoryProps = {
  data: category;
  searchParams?: SearchParams;
};

const SingleCategory = ({ data, searchParams }: SingleCategoryProps) => {
  const url = urlBuilder("edit-category-" + data.id, searchParams);

  return (
    <div className="flex items-center gap-2">
      <h1 className="">{data.title}</h1>
      <Link href={url} className="">
        E
      </Link>
    </div>
  );
};

export default SingleCategory;
