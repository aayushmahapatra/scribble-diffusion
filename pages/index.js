import Canvas from "components/canvas";
import PromptForm from "components/prompt-form";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Predictions from "components/predictions";
import Error from "components/error";
import uploadFile from "lib/upload";
import naughtyWords from "naughty-words";
import Script from "next/script";
import seeds from "lib/seeds";
import pkg from "../package.json";
import sleep from "lib/sleep";

const HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function Home() {
  const [error, setError] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [predictions, setPredictions] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [scribbleExists, setScribbleExists] = useState(false);
  const [seed] = useState(seeds[Math.floor(Math.random() * seeds.length)]);
  const [initialPrompt] = useState(seed.prompt);
  const [scribble, setScribble] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // track submissions so we can show a spinner while waiting for the next prediction to be created
    setSubmissionCount(submissionCount + 1);

    // const prompt = e.target.prompt.value
    //   .split(/\s+/)
    //   .map((word) => (naughtyWords.en.includes(word) ? "something" : word))
    //   .join(" ");

    // setError(null);
    // setIsProcessing(true);

    // const fileUrl = await uploadFile(scribble);

    // const body = {
    //   prompt,
    //   image: fileUrl,
    //   structure: "scribble",
    // };

    // const response = await fetch("/api/predictions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });
    // let prediction = await response.json();

    // setPredictions((predictions) => ({
    //   ...predictions,
    //   [prediction.id]: prediction,
    // }));

    // if (response.status !== 201) {
    //   setError(prediction.detail);
    //   return;
    // }

    // while (
    //   prediction.status !== "succeeded" &&
    //   prediction.status !== "failed"
    // ) {
    //   await sleep(500);
    //   const response = await fetch("/api/predictions/" + prediction.id);
    //   prediction = await response.json();
    //   setPredictions((predictions) => ({
    //     ...predictions,
    //     [prediction.id]: prediction,
    //   }));
    //   if (response.status !== 200) {
    //     setError(prediction.detail);
    //     return;
    //   }
    // }

    setIsProcessing(false);
    let dummyPredictions = {
      qnfrg7xdkjby5hsfw7pxlo57wq: {
        completed_at: "2023-04-22707:09:28.515587Z",
        created_at: "2023-04-22707:09:25.049291Z",
        error: null,
        id: "qnfrg7xdkjby5hsfw7pxlo57wq",
        input: {
          image:
            "https://upcdn.io/Fw25b4F/raw/uploads/scribble-diffusion/1.0.0/2023-04-22/scribble_input_8PPvH3dz.png",
          prompt: "a photo of a black cat with green eyes on water",
          structure: "scribble",
        },
        metrics: {
          predict_time: 3.346847,
        },
        output: [
          "https://replicate.delivery/pbxt/6RTQQwG0bT4lMhDklmfeINV5SIHqMeFwdpey2Jkmv16eEdiGC/out-0.png",
        ],
        started_at: "2023-04-22707:09:25.168740Z",
        status: "succeeded",
        urls: {
          cancel:
            "https://api. replicate.com/v1/predictions/qnfrg7xdkjby5hsfw7pxlo57wq/cancel",
          get: "https://api.replicate.com/v1/predictions/qnfrg7xdkjby5hsfw7pxlo57wq",
        },
        version:
          "d55b9f2dcfb156089686b8767776d5b61b007187a4e1e611881818098100fbb",
        webhook_completed: null,
      },
    };

    setPredictions(dummyPredictions);
  };

  return (
    <>
      <Head>
        <title>{pkg.appName}</title>
        <meta name="description" content={pkg.appMetaDescription} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={pkg.appMetaDescription} />
        <meta
          property="og:image"
          content={`${HOST}/og-b7xwc4g4wrdrtneilxnbngzvti.jpg`}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className="container max-w-[1024px] mx-auto p-5 ">
        <div className="container max-w-[512px] mx-auto">
          <hgroup>
            <h1 className="text-center text-5xl font-bold m-4">
              {pkg.appName}
            </h1>
            <p className="text-center text-xl opacity-60 m-4">
              {pkg.appSubtitle}
            </p>
          </hgroup>

          <div className="text-center lil-text mt-8 mb-8">
            <div className="inline-block py-3 px-4 bg-brand text-black rounded-lg">
              🍿 This is a project from{" "}
              <Link
                href="https://replicate.com?utm_source=project&utm_campaign=scribblediffusion"
                target="_blank"
              >
                Replicate
              </Link>
              . Want to build an app like this? <br />
              <Link
                href="https://github.com/replicate/scribble-diffusion"
                target="_blank"
              >
                Fork it on GitHub
              </Link>{" "}
              or check out the{" "}
              <Link href="https://youtu.be/6z07OdbrWOs" target="_blank">
                video tutorial
              </Link>
              .
            </div>
          </div>

          <Canvas
            startingPaths={seed.paths}
            onScribble={setScribble}
            scribbleExists={scribbleExists}
            setScribbleExists={setScribbleExists}
          />

          <PromptForm
            initialPrompt={initialPrompt}
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
            scribbleExists={scribbleExists}
          />

          <Error error={error} />
        </div>

        <Predictions
          predictions={predictions}
          isProcessing={isProcessing}
          submissionCount={submissionCount}
        />
      </main>

      <Script src="https://js.upload.io/upload-js-full/v1" />
    </>
  );
}
