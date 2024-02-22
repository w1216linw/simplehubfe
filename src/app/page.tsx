import { getSession } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const session = getSession();
  return (
    <main className="flex min-h-screen items-center justify-center gap-20 p-24">
      <Link
        href="/manager"
        className="text-center bg-slate-200 rounded-lg overflow-hidden"
      >
        <div className="w-52 h-64 bg-slate-300"></div>
        <p className="py-1">I am manager</p>
      </Link>
      <Link
        href="/user"
        className="text-center bg-slate-200 rounded-lg overflow-hidden"
      >
        <div className="w-52 h-64 bg-slate-300"></div>
        <p className="py-1">I am user</p>
      </Link>
      {!session && <Link href="/login">Go to Login</Link>}
    </main>
  );
}
