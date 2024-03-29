import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { Wrapper } from "@/context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import Script from "next/script";
import { GoogleAnalytics } from "nextjs-google-analytics";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Wrapper>
        <Component {...pageProps} />
        <GoogleAnalytics trackPageViews />
        <ToastContainer />
      </Wrapper>
    </SessionProvider>
  );
}

export default App;
