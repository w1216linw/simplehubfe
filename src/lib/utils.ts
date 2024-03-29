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

export function pickColor(index: number) {
  const lightColors = [
    "#FFD9E6",
    "#BFEFFF",
    "#C1FFC1",
    "#FFFFCC",
    "#FFE4C4",
    "#FFDEAD",
    "#E0FFFF",
  ];

  return lightColors[index % lightColors.length];
}

export async function fetchTotalMenuItemsPages() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/menu-items/counts`
  ).then((res) => res.json());
}

export function urlBuilder(
  modalName: string,
  dicts?: Record<string, string>
): string {
  const params = new URLSearchParams();
  params.set(modalName, "y");
  if (!dicts) return "?" + params.toString();
  Object.entries(dicts).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return "?" + params.toString();
}
