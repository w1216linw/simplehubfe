import Pagination from "@/app/manager/menu/pagination";
import { fetchTotalMenuItemsPages } from "@/lib/utils";
import CategoryNavbar from "./CategoryNavbar";
import MenuItems from "./MenuItems";

const MenuPage = async ({
  searchParams,
}: {
  searchParams?: { sort?: string; page?: string };
}) => {
  const sort = searchParams?.sort || "all";
  const pageNum = searchParams?.page || "1";

  const totals: { counts: number; total_pages: number } =
    await fetchTotalMenuItemsPages(sort);

  return (
    <section>
      <CategoryNavbar />
      <div className="flex flex-col justify-between">
        <MenuItems sort={sort} page={pageNum} />
        <Pagination totalPages={totals.total_pages} counts={totals.counts} />
      </div>
    </section>
  );
};

export default MenuPage;
