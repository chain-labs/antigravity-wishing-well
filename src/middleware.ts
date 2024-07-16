import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function middleware() {
	const forwardedFor = headers().get("x-forwarded-for");
	const realIp = headers().get("x-real-ip");

	const apiResponse = await (
		await fetch(
			`https://get.geojs.io/v1/ip/country/${realIp ?? "0.0.0.0"}.json`
		)
	).json();

	const restrictedCountryCodes = ["GUM", "USA", "VIR", "PRI"];

	if (restrictedCountryCodes.includes(apiResponse.country_3)) {
		return NextResponse.redirect("/blocked");
	}
}

// GUM, USA, VIR, PRI