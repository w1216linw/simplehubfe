"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import type { session } from "./types";
import { getSession } from "./utils";

export async function authenticate(formData: FormData) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/auth/jwt/create", {
      method: "POST",
      body: formData,
    });
    const data: { access: string; refresh: string } = await res.json();
    if (data) {
      const res2 = await fetch(process.env.NEXT_PUBLIC_URL + "/auth/users/me", {
        headers: {
          Authorization: `JWT ${data.access}`,
        },
      });
      const info = await res2.json();
      let session = JSON.stringify({
        ...data,
        username: info.username,
        refresh_on: new Date().getTime() + 20,
      });
      cookies().set("session", session, {
        httpOnly: true,
      });
      redirect("/");
    }
  } catch (error) {
    throw error;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return NextResponse.redirect(new URL("/login", request.url));

  const parse_session: session = JSON.parse(session);
  if (Date.now() > parse_session.refresh_on) {
    const refresh_res = await fetch(
      process.env.NEXT_PUBLIC_URL + "/auth/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: parse_session.refresh,
        }),
      }
    );
    const new_access = await refresh_res.json();
    if (new_access?.code === "token_not_valid") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    let new_session: session = {
      ...parse_session,
      access: new_access.access,
      refresh_on: Date.now() + 30 * 60 * 1000,
    };

    const response = NextResponse.next();
    response.cookies.set({
      name: "session",
      value: JSON.stringify(new_session),
      httpOnly: true,
    });
    return response;
  } else return NextResponse.next();
}

export async function newCategory(formData: FormData) {
  const session = getSession();
  if (!session) {
    redirect("/login");
  }

  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/menu-items", {
    method: "POST",
    headers: {
      authorization: `JWT ${session.access}`,
    },
    body: formData,
  });
  if (!res.ok) {
  }
  revalidatePath("/manager/menu/category");
}

export async function newMenuItem(formData: FormData) {
  const session = getSession();
  if (!session) {
    redirect("/login");
  }

  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/menu-items", {
    method: "POST",
    headers: {
      authorization: `JWT ${session.access}`,
    },
    body: formData,
  });
  if (!res.ok) {
  }
  revalidatePath("/manager/menu/menu-item");
}
