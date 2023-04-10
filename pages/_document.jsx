import { Html, Head, Main, NextScript } from "next/document";

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
        <script
          async
          src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      </body>
    </Html>
  );
}
