import { FC } from "react";
import Head from "next/head";
import pkg from "package.json";
import { Prediction } from "components/prediction";

interface IScribble {
  baseUrl: string;
  prediction: any;
}

const Scribble: FC<IScribble> = ({ prediction, baseUrl }) => {
  return (
    <div>
      <Head>
        <title>
          {prediction && `${prediction.input.prompt} - `}
          {pkg.appName}
        </title>
        <meta name="description" content={prediction.input.prompt} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={prediction.input.prompt} />
        <meta
          property="og:image"
          content={`${baseUrl}/api/og?id=${prediction.id}`}
        />
      </Head>
      <main className="container max-w-[1024px] mx-auto p-5">
        <Prediction prediction={prediction} showLinkToNewScribble={true} />
      </main>
    </div>
  );
};

export default Scribble;

// Use getServerSideProps to force Next.js to render the page on the server,
// so the OpenGraph meta tags will have the proper URL at render time.
export async function getServerSideProps({ req }) {
  const protocol = req.headers.referer?.split("://")[0] || "http";
  const predictionId = req.url.split("/")[2];
  const baseUrl = `${protocol}://${req.headers.host}`;
  const response = await fetch(`${baseUrl}/api/predictions/${predictionId}`);
  const prediction = await response.json();
  return { props: { baseUrl, prediction } };
}
