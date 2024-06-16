import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const forwardedFor = headers().get("x-forwarded-for");
	const realIp = headers().get("x-real-ip");

	// if (forwardedFor) {
	// 	return NextResponse.json({
	// 		forwardedFor
	// 	});
	// }
	return NextResponse.json({
		realIp,
		forwardedFor
	});

	// return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
// 	matcher: ["/wishwell"],
// };
