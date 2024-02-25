import { category } from "@/lib/types";

const CatePage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  let cate: category[] = [];
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL + `/api/categories?page=${page}`
  );
  const data = await res.json();
  cate = data.results;
  return (
    <div className="flex gap-2">
      {cate.map((c) => (
        <div key={c.id}>{c.title}</div>
      ))}
    </div>
  );
};

export default CatePage;
