import { TEST_NETWORK } from "@/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseURL = "https://antigravity-s3.s3.us-east-1.amazonaws.com/static";
  let URL = [""];

  const file = request.nextUrl.searchParams.get("file");

  console.log({ file });
  switch (file) {
    case "tokens": {
      URL = [`${baseURL}/mining_tokenlist.json`];
      break;
    }
    case "era1": {
      // TODO: change ERA1 prod route
      URL = [
        TEST_NETWORK
          ? `${baseURL}/ERA1/output.test.json`
          : `${baseURL}/ERA1/output.test.json`,
      ];
      break;
    }
    case "era2": {
      // TODO: change ERA2 prod route
      URL = [
        TEST_NETWORK
          ? `${baseURL}/ERA2/output.test.json`
          : `${baseURL}/ERA2/output.test.json`,
      ];
      break;
    }
    default: {
      URL = [
        `${baseURL}/mining_tokenlist.json`,
        TEST_NETWORK
          ? `${baseURL}/ERA1/output.test.json`
          : `${baseURL}/ERA1/output.test.json`,
        TEST_NETWORK
          ? `${baseURL}/ERA2/output.test.json`
          : `${baseURL}/ERA2/output.test.json`,
      ];
    }
  }

  try {
    const requests = URL.map((url) => axios.get(url));
    const responses = await axios.all(requests);

    const datas = responses.map((response) => {
      return { data: response.data };
    });

    let response = {
      tokens: null,
      era1: null,
      era2: null,
    };

    switch (file) {
      case "tokens": {
        response = { ...response, tokens: datas[0]?.data?.tokens || null };
        break;
      }
      case "era1": {
        response = { ...response, era1: datas[0]?.data || null };
        break;
      }
      case "era2": {
        response = { ...response, era2: datas[0]?.data || null };
        break;
      }
      default: {
        response = {
          tokens: datas[0]?.data?.tokens || null,
          era1: datas[1]?.data || null,
          era2: datas[2]?.data || null,
        };
      }
    }

    return NextResponse.json({
      data: response,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Not Found",
    });
  }
}
