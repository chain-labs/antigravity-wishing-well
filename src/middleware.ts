import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const forwardedFor = headers().get("x-forwarded-for");
  const realIp = headers().get("x-real-ip");

  const apiResponse = await (
    await fetch(
      `https://get.geojs.io/v1/ip/country/${realIp ?? "0.0.0.0"}.json`,
    )
  ).json();

  const restrictedCountryCodes = ["GUM", "USA", "VIR", "PRI"];

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Check if the request is for a static asset or API endpoint
  const isPageAsset = pathname.startsWith("/_next/static/chunks/app/(client)");

  if (isPageAsset) {
    console.log("url", pathname );
    if (restrictedCountryCodes.includes(apiResponse.country_3) && !pathname.includes("/blocked")) {
      return NextResponse.redirect(new URL("/blocked", request.url));
    } else if (pathname.includes("/blocked")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
