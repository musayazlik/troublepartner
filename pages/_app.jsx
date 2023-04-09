import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Wrapper } from "@/context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

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
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </Wrapper>
  );
}

export default App;
