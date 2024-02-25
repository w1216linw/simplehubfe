import { menuItem } from "@/lib/types";

const MenuItem = ({ menuItem }: { menuItem: menuItem }) => {
  return (
    <tr className="">
      <td>{menuItem.title}</td>
      <td>{menuItem.category_name}</td>
      <td>${menuItem.price}</td>
      <td>buttons</td>
    </tr>
  );
};

export default MenuItem;
