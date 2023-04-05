import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Wrapper } from "@/context";

function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Wrapper>
  );
}

export default App;
