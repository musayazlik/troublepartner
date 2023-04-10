import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Wrapper } from "@/context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import Script from "next/script";

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
    <Wrapper>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8831973080518055"
      />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </Wrapper>
  );
}

export default App;
