import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const { basePath } = useRouter();
  useEffect(() => {
    const faviconId = "dynamic-favicon";
    let link = document.querySelector(`link[rel='icon']#${faviconId}`);
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.id = faviconId;
      document.head.appendChild(link);
    }
    link.href = basePath + "/GitHub.avif";
  }, [basePath]);
  return <Component {...pageProps} />;
}