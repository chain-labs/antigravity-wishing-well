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
      isNativeToken: native === "true",
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
        case "0x2263Cc09b146d153AFf22841471201618bD628B5":
        case "0x2321C1A41e42F3582c4bcAaf95A081a224B929a9": {
          price = 1;
          break;
        }
        case "0xDC6ba85E08c7e94244865cCdF993c2e852181716":
        case "0x6484A6Ae44Cfa051a1158C918446D08D12fC4168": {
          price = 0.0195;
          break;
        }
        case "0x06413454185660d32C12D7217DBe79030Fe44527":
        case "0x12861ab30Dbb50dC3e9b449DD33F9DA693120cF1": {
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
