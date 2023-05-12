import { Html, Head, Main, NextScript } from "next/document";
import Footer from "components/footer";

const Document = () => {
  return (
    <Html>
      <Head></Head>

      <body className="bg-gray-100">
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
