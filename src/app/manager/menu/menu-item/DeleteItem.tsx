"use client";
import { deleteMenuItem } from "@/lib/actions";
import { FaTrash } from "react-icons/fa";

const DeleteItem = ({ id }: { id: number }) => {
  return (
    <div>
      <form action={deleteMenuItem.bind(null, id)}>
        <input type="text" value={id} name="id" className="hidden" />
        <button>
          <FaTrash className="text-lg" />
          <span className="sr-only">Delete</span>
        </button>
      </form>
    </div>
  );
};

export default DeleteItem;
