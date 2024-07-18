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
        case "0x51a17b6328329D513E6F700891C3F5C1a32c9Ca7":
        case "0x1105D67414b7de821b2fDd7BCd58138Ac7595AD1": {
          price = 1;
          break;
        }
        case "0xB13D2634Ca5618D566831888C987F4C5dDadD096":
        case "0x736101e155216b330d7aE36Ea961b03373a9B4eC": {
          price = 0.0195;
          break;
        }
        case "0x07686D5eB3a28b1784DAbE394F7d46164641Cb92":
        case "0x7a71aa1E445c4cc0c0187973a9DA5DBaFfF01c5E": {
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
