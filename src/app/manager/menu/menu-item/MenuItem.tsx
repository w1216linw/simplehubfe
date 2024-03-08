import { menuItem } from "@/lib/types";
import { urlBuilder } from "@/lib/utils";
import { MdOutlineStar } from "react-icons/md";
import { SearchParams } from "../page";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";

const MenuItem = ({
  menuItem,
  searchParams,
}: {
  menuItem: menuItem;
  searchParams: SearchParams;
}) => {
  const newSearchParams = { ...searchParams, id: menuItem.id.toString() };
  const url = urlBuilder(
    "edit-item-" + menuItem.id,
    newSearchParams
  ).toString();

  return (
    <>
      <tr className="">
        <td className="py-2 relative">
          {menuItem.featured && (
            <div className="h-full absolute -left-4 top-0 flex items-center">
              <MdOutlineStar />
            </div>
          )}
          <p>{menuItem.title}</p>
        </td>
        <td className="py-2">{menuItem.category_name}</td>
        <td className="py-2">${menuItem.price}</td>
        <td className="py-2">
          <div className="flex gap-4 items-center relative">
            <EditItem url={url} />
            <DeleteItem id={menuItem.id} />
          </div>
        </td>
      </tr>
    </>
  );
};

export default MenuItem;
