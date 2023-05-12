import Head from "next/head";
import pkg from "package.json";

const RecentScribbles = () => {
  return (
    <div>
      <Head>
        <meta name="description" content={pkg.appMetaDescription} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={pkg.appMetaDescription} />
        <title>{pkg.appName}</title>s
      </Head>
    </div>
  );
};

export default RecentScribbles;
