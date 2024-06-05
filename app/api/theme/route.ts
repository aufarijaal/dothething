import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ message: "OK" }, { status: 200, statusText: "OK" });
  const body = await request.json();

  response.cookies.set({
    name: "theme",
    value: body.theme,
    path: "/",
    sameSite: "none",
    maxAge: 365 * 24 * 60 * 60,
    secure: true,
  });

  return response;
}
