"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import type { session, tokens } from "./types";
import { getSession } from "./utils";

export type LoginStateProp = {
  username: string;
  password: string;
  errors: {
    text: string | undefined;
  };
} | null;

export async function authenticate(
  previousState: LoginStateProp,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/auth/jwt/create", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Username or password is invalid");
    }
    const data: tokens = await res.json();
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
    }
  } catch (error) {
    let error_message = "Server error";
    if (error instanceof Error) error_message = error.message;
    return {
      username,
      password,
      errors: {
        text: error_message,
      },
    };
  }
  redirect("/");
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

export type CategoryFormState = {
  input: string;
  errors: {
    text: string | undefined;
  };
};

export async function newCategory(
  previousState: CategoryFormState,
  formData: FormData
) {
  const title = formData.get("title") as string;
  try {
    const session = getSession();
    if (!session) {
      redirect("/login");
    }

    if (title.length < 3)
      throw new Error("Category title must be at least 3 characters");

    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/categories", {
      method: "POST",
      headers: {
        authorization: `JWT ${session.access}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message.title);
    }
  } catch (error) {
    let error_message = "Unable to add category";
    if (error instanceof Error) error_message = error.message;

    return {
      input: title,
      errors: {
        text: error_message,
      },
    };
  }
  revalidatePath("/manager/menu");
  return {
    input: "",
    errors: {
      text: undefined,
    },
  };
}

export async function editCategory(
  state: CategoryFormState,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const id = formData.get("id") as string;
  try {
    const session = getSession();
    if (!session) {
      redirect("/login");
    }

    if (title.length < 3)
      throw new Error("Category title must be at least 3 characters");

    const res = await fetch(
      process.env.NEXT_PUBLIC_URL + `/api/categories/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `JWT ${session.access}`,
        },
        body: formData,
      }
    );
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message.title);
    }
  } catch (error) {
    let error_message = "Unable to edit category";
    if (error instanceof Error) error_message = error.message;

    return {
      input: title,
      errors: {
        text: error_message,
      },
    };
  }
  revalidatePath("/manager/menu");
  return {
    input: "",
    errors: {
      text: undefined,
    },
  };
}

export type MenuFormState = {
  title: string;
  price: string;
  errors: {
    text: string | undefined;
  };
};

export async function newMenuItem(state: MenuFormState, formData: FormData) {
  const session = getSession();
  if (!session) {
    redirect("/login");
  }

  try {
    const title = formData.get("title");
    if (!title) {
      throw new Error("Invalid title.");
    }
    const price = formData.get("price");
    if (!price || isNaN(Number(price))) {
      throw new Error("Invalid price.");
    }
    const category = formData.get("category");
    if (!category || isNaN(Number(category))) {
      throw new Error("Invalid Category.");
    }
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/menu-items", {
      method: "POST",
      headers: {
        authorization: `JWT ${session.access}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message.title);
    }
  } catch (error) {
    let error_message = "Unable to add new menu item";
    if (error instanceof Error) error_message = error.message;
    return {
      title: state.title,
      price: state.price,
      errors: {
        text: error_message,
      },
    };
  }

  revalidatePath("/manager/menu");
  return {
    title: "",
    price: "",
    errors: {
      text: undefined,
    },
  };
}

export async function deleteMenuItem(id: number) {
  const session = getSession();
  if (!session) {
    redirect("/login");
  }

  try {
    if (!process.env.NEXT_PUBLIC_URL) throw new Error("Server Error");
    const res = await fetch(
      process.env.NEXT_PUBLIC_URL + `/api/menu-items/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `JWT ${session.access}`,
        },
      }
    );
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message.title);
    }
  } catch (error) {
    let error_message = "Unable to delete menu item";
    if (error instanceof Error) error_message = error.message;
    return {
      errors: {
        text: error_message,
      },
    };
  }

  revalidatePath("/manager/menu");
  return {
    errors: {
      text: undefined,
    },
  };
}

export async function editMenuItem(state: MenuFormState, formData: FormData) {
  const session = getSession();
  if (!session) {
    redirect("/login");
  }

  try {
    const title = formData.get("title");
    if (!title) {
      throw new Error("Invalid title.");
    }
    const price = formData.get("price");
    if (!price || isNaN(Number(price)) || Number(price) < 0) {
      throw new Error("Invalid price.");
    }
    const category = formData.get("category");
    if (!category || isNaN(Number(category))) {
      throw new Error("Invalid Category.");
    }
    const id = formData.get("id");

    if (isNaN(Number(price))) {
      throw new Error("Invalid price");
    }
    const res = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/menu-items/" + id,
      {
        method: "PATCH",
        headers: {
          authorization: `JWT ${session.access}`,
        },
        body: formData,
      }
    );
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message.title);
    }
  } catch (error) {
    let error_message = "Unable to add new menu item";
    if (error instanceof Error) error_message = error.message;
    return {
      title: state.title,
      price: state.price,
      errors: {
        text: error_message,
      },
    };
  }

  revalidatePath("/manager/menu");
  return {
    title: "",
    price: "",
    errors: {
      text: undefined,
    },
  };
}
