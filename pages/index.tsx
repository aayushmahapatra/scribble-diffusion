import { FC, useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import { useSession, signIn } from "next-auth/react";
import seeds from "lib/seeds";
import Canvas from "components/canvas";
import pkg from "package.json";

const SignIn: FC = () => {
  const { data: session } = useSession();
  const [seed] = useState(seeds[Math.floor(Math.random() * seeds.length)]);

  useEffect(() => {
    if (session) Router.push("/home");
  }, [session]);

  return (
    <>
      <Head>
        <title>{pkg.appName}</title>
        <meta name="description" content={pkg.appMetaDescription} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={pkg.appMetaDescription} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <hgroup className="bg-black w-full mb-4 text-white p-6">
        <h1 className="text-center text-4xl font-bold">
          Generate and Mint <span className="text-[#9bf96e]">AI based</span>{" "}
          Avatars
        </h1>
        <p className="text-center text-lg py-1 w-1/3 mx-auto text-gray-300">
          {pkg.appSubtitle}
        </p>
      </hgroup>
      <main className="container max-w-[512px] mx-auto border border-black rounded-lg p-8 my-10">
        <h2 className="text-center text-2xl font-bold mb-6">
          Sign In with <span className="text-[#7ad749]">Google</span> and Start
          creating!
        </h2>
        <section className="flex justify-center mb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn("google", {
                callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/home`,
              });
            }}
            className="lil-button hover:opacity-80 active:opacity-100 active:bg-[#9bf96e]"
          >
            Sign In with Google
          </button>
        </section>
        <Canvas
          startingPaths={seed.paths}
          onScribble={() => {}}
          scribbleExists={true}
          setScribbleExists={() => {}}
        />
      </main>
    </>
  );
};

export default SignIn;
