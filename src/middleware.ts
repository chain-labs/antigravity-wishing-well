import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const realIp = headers().get("x-real-ip");

  const apiResponse = await (
    await fetch(
      `https://get.geojs.io/v1/ip/country/${realIp ?? "0.0.0.0"}.json`,
    )
  ).json();

  const restrictedCountryCodes = ["GUM", "USA", "VIR", "PRI"];

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  console.log(url);

  if (!pathname.includes("/blocked")) {
    if (restrictedCountryCodes.includes(apiResponse.country_3) || true) {
      return NextResponse.redirect(url.origin + "/blocked");
    }
  }
  if (pathname.includes("/blocked")) {
    if (!restrictedCountryCodes.includes(apiResponse.country_3)) {
      return NextResponse.redirect(url.origin + "/");
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico|models).*)",
  ],
};
