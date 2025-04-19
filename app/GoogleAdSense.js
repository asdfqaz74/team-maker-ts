import Script from "next/script";

const PID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

export default function GoogleAdSense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${PID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
