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
      case "0x72d9F40C7De5F6F2aB699EAA0ca7c66f937C37b9":
      case "0x3A927E1E8D15A8bb676535F1514106683293d153": {
        price = 1;
        break;
      }
      case "0x8B4b597BC078b19be4454062064F446E850afa5f":
      case "0xaf177f24CF0388c698571AcB6E3f1DE50026155A": {
        price = 0.0195;
        break;
      }
      case "0x7EDA2eB75892922D809C0A73518957594A5043cE":
      case "0x650A08cc7BafD06C4c16D8dbb0eE755aD7480Bf9": {
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

  return NextResponse.json({ price });
}
