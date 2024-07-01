import { NextRequest, NextResponse } from "next/server";
import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";

export async function POST(request: NextRequest) {
  try {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "balanceOf",
            action: "post",
            target: `${process.env.NEXT_PUBLIC_URL}/api/functionCall`,
          },
          {
            label: `allowance`,
            action: "post",
            target: `${process.env.NEXT_PUBLIC_URL}/api/functionCall`,
          },
        ],
        image: `${process.env.NEXT_PUBLIC_URL}/1.png`,
      })
    );
  } catch (error: any) {
    console.error("Error generating frame response:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error generating frame response",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export const dynamic = "force-dynamic";
