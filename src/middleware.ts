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
  console.log(request.nextUrl);
  if (
    restrictedCountryCodes.includes(apiResponse.country_3) &&
    request.nextUrl.searchParams.get("blocked") !== "true"
  ) {
    return NextResponse.redirect(url.origin + "/blocked?blocked=true");
  }
  if (pathname.includes("/blocked")) {
    if (!restrictedCountryCodes.includes(apiResponse.country_3)) {
      return NextResponse.redirect(url.origin + "/");
    }
  }
}
