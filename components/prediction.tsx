import { FC, useState } from "react";
import Link from "next/link";
import { Contract, ethers } from "ethers";
import { upload } from "@spheron/browser-upload";
import { PlusCircle as PlusCircleIcon } from "lucide-react";
import copy from "copy-to-clipboard";
import erc721Abi from "abis/ERC721.json";
import Loader from "components/loader";

interface IPrediction {
  prediction: any;
  showLinkToNewScribble?: boolean;
}

const Prediction: FC<IPrediction> = ({
  prediction,
  showLinkToNewScribble = false,
}) => {
  const [uploadRes, setUploadRes] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");

  const copyLink = () => {
    const url =
      window.location.origin +
      "/scribbles/" +
      (prediction.uuid || prediction.id); // if the prediction is from the Replicate API it'll have `id`. If it's from the SQL database, it'll have `uuid`
    copy(url);
  };

  const handleUpload = async (imgUrl) => {
    // create file from image url
    let res = await fetch(imgUrl);
    let data = await res.blob();
    let metadata = { type: "image/png" };
    let file = new File([data], "avatar.png", metadata);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ADDR}/initiate-upload`
    );
    const resJson = await response.json();
    const uploadResult = await upload([file], {
      token: resJson.uploadToken,
    });
    setUploadRes(uploadResult);
  };

  const handleMint = async (imgUrl: string) => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    const signer = provider.getSigner();
    const erc721Contract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      erc721Abi,
      signer
    );
    const tx = await erc721Contract.mint(imgUrl);
    const receipt = await tx.wait();
    console.log(receipt);
    setTransactionHash(receipt.transactionHash);
  };

  if (!prediction) return null;

  return (
    <div className="mt-6 mb-12">
      <div className="border my-5 p-5 bg-white flex rounded-md shadow-md">
        <div className="w-1/2 aspect-square relative border">
          <img
            src={prediction.input.image}
            alt="input scribble"
            className="w-full aspect-square"
          />
        </div>
        <div className="w-1/2 aspect-square relative">
          {prediction.output?.length ? (
            <img
              src={prediction.output[prediction.output.length - 1]}
              alt="output image"
              className="w-full aspect-square"
            />
          ) : (
            <div className="grid h-full place-items-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="text-center px-4 opacity-60 text-xl py-2 my-2 rounded-md bg-gray-300 border border-black">
        &ldquo;{prediction.input.prompt}&rdquo;
      </div>
      <div className="text-center py-2">
        <button
          onClick={() => handleUpload(prediction?.output[0])}
          className="bg-[#9bf96e] border border-black py-1 px-8 rounded shadow hover:opacity-80 active:opacity-100 active:bg-[#9bf96e]"
        >
          Upload
        </button>

        {uploadRes && (
          <button
            onClick={() => handleMint(uploadRes?.dynamicLinks[0])}
            className="bg-[#9bf96e] border border-black ml-4 py-1 px-8 rounded shadow hover:opacity-80 active:opacity-100 active:bg-[#9bf96e]"
          >
            Mint
          </button>
        )}

        {uploadRes?.dynamicLinks[0] && (
          <div className="mt-4">
            Spheron Upload URL:{" "}
            <a
              href={`https://${uploadRes?.dynamicLinks[0]}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              {uploadRes?.dynamicLinks[0]}
            </a>
          </div>
        )}

        {transactionHash && (
          <div className="mt-2">Transaction Hash: {transactionHash}</div>
        )}

        {showLinkToNewScribble && (
          <Link href="/">
            <button className="lil-button" onClick={copyLink}>
              <PlusCircleIcon className="icon" />
              Create a new scribble
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export { Prediction };
