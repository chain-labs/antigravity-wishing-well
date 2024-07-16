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
        case "0xd8653339bff4A18108e9BFC2d5d15C90a4F04eA5":
        case "0xaBA9FaCcf99C36D61A7C855ED77a58FC49151d5A": {
          price = 1;
          break;
        }
        case "0xe27BF9eC399883DD26Cc1CF02f3e34b6b83d7EBf":
        case "0x95C835EE2B7560E7e5116d533795548Ea6367313": {
          price = 0.0195;
          break;
        }
        case "0x11334A36427C607Aa07bd607DbBB27fcDa6db6AB":
        case "0x3256e547407F63C862EC0732272028534B6676d2": {
          price = 0.000000000029;
          break;
        }
        case "0x4200000000000000000000000000000000000006":
        case "0xfff9976782d46cc05630d1f6ebab18b2324d6b14": {
          price = 2.3;
          break;
        }
      }
    }
  }

  return NextResponse.json({ price });
}
