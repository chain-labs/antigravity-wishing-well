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
        case "0xdE233753Dc215f6F0a66ad44Ec48Fa7807b59230":
        case "0x16d5C98Dc59170c2a92FD00F1E1533389AD935FF": {
          price = 1;
          break;
        }
        case "0x8D199DF61b9FfdCde53b192e1B9CFA5d2Ca27a2b":
        case "0x2827B8EBF24c58e0F21e5aEfF4F2971d1b18a5a2": {
          price = 0.0195;
          break;
        }
        case "0x08B1a5956784F184469d3b05d76a8B1cDf76904f":
        case "0x5e1e2F03762a751cC9DD4e9f434616D479a7f4C6": {
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
