import { menuItem } from "@/lib/types";

const MenuItem = ({ menuItem }: { menuItem: menuItem }) => {
  return (
    <div className="flex">
      <h1>{menuItem.title}</h1>
      <p>categories</p>
      <p>price</p>
      <div>buttons</div>
    </div>
  );
};

export default MenuItem;
