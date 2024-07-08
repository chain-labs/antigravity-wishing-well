import { API_ENDPOINT, TEST_NETWORK } from "@/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { base, pulsechain, sepolia } from "viem/chains";

const chainToCGNetwork = (chainId: number) => {
  switch (chainId) {
    case sepolia.id:
      return "sepolia_testnet";
    case base.id:
      return "base";
    case pulsechain.id:
      return "pulsechain";
  }
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const pool = request.nextUrl.searchParams.get("pool");
  const network = request.nextUrl.searchParams.get("network");
  let price = 0;

  try {
    const endpoint = `${API_ENDPOINT}/api/token-price`;
    const priceData = await axios.post(endpoint, {
      tokenAddress: token,
      poolAddress: pool,
      network: chainToCGNetwork(Number(network)),
      isNativeToken: false,
    });

    price = priceData.data.price;

    console.log({ priceData: priceData.data.price });
  } catch (err) {
    console.log({ err });
    switch (token) {
      case "0xfC7A9aa6C62e92e01A379223291656718803896b": {
        price = 1;
        break;
      }
      case "0x49A8741a46C4b4b99525FFB88123E1Ea59CA5925": {
        price = 0.0195;
        break;
      }
      case "0x5CD3f6f083e51F2fe3477D8fFB828eb36702c5Cd": {
        price = 0.000000000029;
        break;
      }
      case "0xfff9976782d46cc05630d1f6ebab18b2324d6b14": {
        price = 2.3;
        break;
      }
    }
  }

  return NextResponse.json({ price });
}
