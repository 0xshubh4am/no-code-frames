import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const name = "No Code Frames";

  const frameMetadata = getFrameMetadata({
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
    image: `${process.env.NEXT_PUBLIC_URL}/2.png`,
  });

  return {
    title: name,
    description: "Make your contract interactor frames in minutes",
    openGraph: {
      title: name,
      description: "Make your contract interactor frames in minutes",
      images: [`${process.env.NEXT_PUBLIC_URL}/oneonone.png`],
    },
    other: {
      ...frameMetadata,
      "fc:frame:image:aspect_ratio": "1.91:1",
    },
  };
}
export default function Page({ params }: { params: { address: string } }) {
  return (
    <div>
      {params.address === "undefined" ? (
        <ConnectButton />
      ) : (
        <div>My Post: {params.address}</div>
      )}
    </div>
  );
}
