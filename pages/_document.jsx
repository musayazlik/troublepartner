import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <meta name="theme-color" content="#14b8a6" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#14b8a6" />
      <meta name="msapplication-navbutton-color" content="#14b8a6" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900;1000&display=swap"
        rel="stylesheet"
      />
      <body className="bg-slate-50">
        <Main />
        <NextScript />
        <Script
          id="Adsense-id"
          style="display:block"
          data-ad-format="fluid"
          data-ad-layout-key="-6t+ed+2i-1n-4w"
          data-ad-client="ca-pub-8831973080518055"
          data-ad-slot="5352367283"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        >
          (adsbygoogle = window.adsbygoogle || []).push({});
        </Script>
      </body>
    </Html>
  );
}
