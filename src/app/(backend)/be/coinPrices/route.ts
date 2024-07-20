import { API_ENDPOINT, TEST_NETWORK } from "@/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";

const chainToCGNetwork = (chainId: number) => {
  switch (chainId) {
    case sepolia.id:
      return "sepolia_testnet";
    case base.id:
      return "base";
    case pulsechain.id:
      return "pulsechain";
    case baseSepolia.id:
      return "sepolia_base";
  }
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const pool = request.nextUrl.searchParams.get("pool");
  const network = request.nextUrl.searchParams.get("network");
  const native = request.nextUrl.searchParams.get("native");
  let price = 0;

  try {
    const endpoint = `${API_ENDPOINT}/api/token-price`;
    const priceData = await axios.post(endpoint, {
      tokenAddress: token,
      poolAddress: pool,
      network: chainToCGNetwork(Number(network)),
      isNativeToken: native,
    });

    price = priceData.data.price;

    console.log({ priceData: priceData.data.price });
  } catch (err) {
    console.log({ err });
    if (native === "true") {
      if (Number(network) === sepolia.id) {
        price = 0.0828;
      } else if (Number(network) === baseSepolia.id) {
        price = 0.0828;
      }
    } else {
      switch (token) {
        case "0xc9ebE800AEB0f53285Cee974481636A11cd89f19":
        case "0x5B87cd1756A186CF4a727E60D203BFAbEB0abF40": {
          price = 1;
          break;
        }
        case "0xC7273e1f8C61Af847790D6ed98aB5B3004225479":
        case "0xef0Ec0FFEb41aD2dDA26416A17b893Fb21068384": {
          price = 0.0195;
          break;
        }
        case "0xdCcbaA9888a770935dB468800f0F4Dec77Aa2ceE":
        case "0xb04D341c41A7e6eDE93b6D3f3A2884133659cCaf": {
          price = 0.000000000029;
          break;
        }
        case "0xfff9976782d46cc05630d1f6ebab18b2324d6b14":
        case "0x4200000000000000000000000000000000000006": {
          price = 2.3;
          break;
        }
      }
    }
  }

  return NextResponse.json({ price });
}
