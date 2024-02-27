import { getSession, logout } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const LinkWrapper = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      className="text-xl font-semibold hover:bg-gray-200 pl-4 py-2 rounded-md transition-colors"
    >
      {text}
    </Link>
  );
};

const ManagerSideGroup = () => {
  const session = getSession();

  return (
    <div className="h-screen w-[min(100%,20rem)] flex flex-col flex-grow-0 flex-shrink-0 gap-5 bg-neutral-50 px-4 py-8">
      <LinkWrapper href="/manager" text="Home" />
      <LinkWrapper href="/manager/menu" text="Menu" />
      <LinkWrapper href="/manager/user" text="User" />
      <LinkWrapper href="/manager/delivery-crew" text="Delivery Crew" />
      <div className="mt-auto flex gap-2">
        <pre className="font-semibold">{session?.username}</pre>
        <form
          action={async () => {
            "use server";
            logout();
            redirect("/");
          }}
        >
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerSideGroup;
