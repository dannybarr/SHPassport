import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import passportCss from "../passport/passport.css?raw";
import passportHtml from "../passport/passport.html?raw";
import passportJs from "../passport/passport.js?raw";

const title = "Passport — Soho House";
const description =
  "A member's passport: a trail of Soho Houses, stamped, remembered and waiting to be found.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const hostRef = useRef<HTMLDivElement>(null);

  // The imported document is plain DOM script: run it once the markup is mounted.
  useEffect(() => {
    if (!hostRef.current) return;
    try {
      new Function(passportJs)();
    } catch (error) {
      console.error("Passport script failed", error);
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: passportCss }} />
      <div ref={hostRef} dangerouslySetInnerHTML={{ __html: passportHtml }} />
    </>
  );
}
