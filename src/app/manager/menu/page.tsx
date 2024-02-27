import Modal from "@/components/Modal";
import { fetchTotalMenuItemsPages } from "@/lib/utils";
import Link from "next/link";
import Categories from "./category/Categories";
import NewCategory from "./category/NewCategory";
import MenuItems from "./menu-item/MenuItems";
import NewMenuItem from "./menu-item/NewMenuItem";
import Pagination from "./pagination";

const MenuPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totals: { counts: number; total_pages: number } =
    await fetchTotalMenuItemsPages();

  return (
    <section className="px-4 space-y-4">
      <div className="bg-neutral-50 p-4 rounded-lg">
        <div className="flex gap-5">
          <h1 className="font-semibold text-lg">Categories</h1>
          <Link
            href={`/manager/menu?${"page=" + currentPage}${
              query && "&query=" + query
            }&new-category=y`}
            className="bg-gray-600 text-neutral-50 px-4 py-1 rounded-xl"
          >
            +
          </Link>
        </div>
        <Categories />
        <Modal title="new-category">
          <NewCategory />
        </Modal>
      </div>
      <div className="bg-neutral-50 p-4 rounded-lg">
        <div className="flex gap-5">
          <h1 className="font-semibold text-lg">Menu Items</h1>
          <Link
            href={`/manager/menu?${"page=" + currentPage}${
              query && "&query=" + query
            }&new-item=y`}
            className="bg-gray-600 text-neutral-50 px-4 py-1 rounded-xl"
          >
            +
          </Link>
        </div>
        <Modal title="new-item">
          <NewMenuItem />
        </Modal>
        <MenuItems query={query} currentPage={currentPage} />
        <Pagination totalPages={totals.total_pages} counts={totals.counts} />
      </div>
    </section>
  );
};

export default MenuPage;
