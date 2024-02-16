import { getSession } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const session = getSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/manager">Go to Manager</Link>
      <Link href="/user">Go to User</Link>
      {!session && <Link href="/login">Go to Login</Link>}
    </main>
  );
}
