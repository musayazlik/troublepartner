import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <meta name="theme-color" content="#3b82f6" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#3b82f6" />
      <meta name="msapplication-navbutton-color" content="#3b82f6" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900;1000&display=swap"
        rel="stylesheet"
      />
      <body className="bg-zinc-50 overflow-x-hidden">
        <Main />
        <NextScript />

        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', "${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}");
        `,
          }}
        />
      </body>
    </Html>
  );
}
