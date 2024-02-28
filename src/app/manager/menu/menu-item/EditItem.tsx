import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EditItem = ({ url }: { url: string }) => {
  return (
    <Link href={url}>
      <button>
        <FaEdit className="text-lg" />
        <span className="sr-only">Edit</span>
      </button>
    </Link>
  );
};

export default EditItem;
