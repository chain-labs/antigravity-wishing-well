import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseURL = "https://antigravity-s3.s3.us-east-1.amazonaws.com/static";
  let URL = "";

  const file = request.nextUrl.searchParams.get("file");

  console.log({ file });
  switch (file) {
    case "tokens": {
      URL = `${baseURL}/mining_tokenlist.json`;
      console.log({ URL });
      break;
    }
  }

  const res = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
