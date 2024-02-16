import { cookies } from "next/headers";
import { session } from "./types";

export function getSession(): session | null {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return JSON.parse(session);
}

export function logout() {
  cookies().delete("session");
}
