import { FC, useEffect, useState } from "react";
import Head from "next/head";
import pkg from "package.json";
import { Prediction } from "components/prediction";

const Scribble: FC = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [prediction, setPrediction] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const protocol = (window as any).location.protocol || "http";
      const predictionId = (window as any).location.pathname.split("/")[2];
      const baseUrl = `${protocol}//${(window as any).location.host}`;
      const response = await fetch(
        `${baseUrl}/api/predictions/${predictionId}`
      );
      const prediction = await response.json();
      setBaseUrl(baseUrl);
      setPrediction(prediction);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>
          {prediction && `${prediction?.input.prompt} - `}
          {pkg.appName}
        </title>
        <meta name="description" content={prediction?.input.prompt} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={prediction?.input.prompt} />
        <meta
          property="og:image"
          content={`${baseUrl}/api/og?id=${prediction?.id}`}
        />
      </Head>
      <main className="container max-w-[1024px] mx-auto p-5">
        <Prediction prediction={prediction} showLinkToNewScribble={true} />
      </main>
    </div>
  );
};

export default Scribble;
