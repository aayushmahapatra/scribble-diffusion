import { SessionProvider } from "next-auth/react";
import "styles/globals.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default MyApp;
