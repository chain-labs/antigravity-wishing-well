import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const forwardedFor = headers().get("x-forwarded-for");
	const realIp = headers().get("x-real-ip");

	const apiResponse = (
		await fetch(`https://get.geojs.io/v1/ip/country/${realIp}.json`)
	).json();

	// if (forwardedFor) {
	// 	return NextResponse.json({
	// 		forwardedFor
	// 	});
	// }
	return NextResponse.json({
		realIp,
		forwardedFor,
		apiResponse,
	});

	// return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
// 	matcher: ["/wishwell"],
// };
