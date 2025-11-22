import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error");

  let message = error ? error.replace(/_/g, " ") : "Ismeretlen hiba történt.";

  const status = 400;

  return NextResponse.redirect(
    new URL(
      `/error?status=${status}&message=${encodeURIComponent(message)}`,
      request.url
    )
  );
}
