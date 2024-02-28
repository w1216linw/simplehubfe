import Modal from "@/components/Modal";
import { fetchTotalMenuItemsPages, urlBuilder } from "@/lib/utils";
import Link from "next/link";
import Categories from "./category/Categories";
import NewCategory from "./category/NewCategory";
import MenuItemDetail from "./menu-item/MenuItemDetail";
import MenuItems from "./menu-item/MenuItems";
import NewMenuItem from "./menu-item/NewMenuItem";
import Pagination from "./pagination";

export type SearchParams = {
  query?: string;
  page?: string;
};

const MenuPage = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totals: { counts: number; total_pages: number } =
    await fetchTotalMenuItemsPages();

  return (
    <section className="p-4 space-y-4 h-full">
      <div className="bg-neutral-50 p-4 rounded-lg min-h-[15%]">
        <div className="flex gap-5">
          <h1 className="font-semibold text-lg">Categories</h1>
          <Link
            href={`/manager/menu?${urlBuilder(
              "new-category",
              searchParams
            ).toString()}`}
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
      <div className="bg-neutral-50 p-4 rounded-lg min-h-[80%] flex-col flex">
        <div className="flex gap-5">
          <h1 className="font-semibold text-lg">Menu Items</h1>
          <Link
            href={`/manager/menu?${urlBuilder(
              "new-item",
              searchParams
            ).toString()}`}
            className="bg-gray-600 text-neutral-50 px-4 py-1 rounded-xl"
          >
            +
          </Link>
        </div>
        <Modal title="new-item">
          <NewMenuItem />
        </Modal>
        <MenuItems query={query} currentPage={currentPage} />
        <Modal title="edit-item">
          <MenuItemDetail />
        </Modal>
        <Pagination totalPages={totals.total_pages} counts={totals.counts} />
      </div>
    </section>
  );
};

export default MenuPage;
