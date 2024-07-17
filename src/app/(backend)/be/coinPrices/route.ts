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
        case "0xFeC8b2A0442D7f6bA2716C736fd0A10A8a13fc15":
        case "0x54E87718fa5db681c3767e6B5fBA1A94B5466e2a": {
          price = 1;
          break;
        }
        case "0x2bbB0B6040A3c5b6b0Ec74283447024034cfc743":
        case "0x1Fd12116fF1C3d2bA9D48Ab3b3f37b21a1e2a550": {
          price = 0.0195;
          break;
        }
        case "0x5801e12dc55040b8614af131DcF91b89A957301d":
        case "0xc16FE9952eCA4336895b80fAd917041F38356CaF": {
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
