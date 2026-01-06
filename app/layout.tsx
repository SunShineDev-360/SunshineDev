import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { ChunkErrorHandler } from "@/app/chunk-error-handler";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/lib/sanity/fetch";
import { NAVBAR_QUERY } from "@/lib/sanity/queries/navbar";
import { FOOTER_QUERY } from "@/lib/sanity/queries/footer";

const SmokeCursor = dynamic(
  () => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/layout.tsx:15',message:'SmokeCursor dynamic import start',data:{timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    return import("@/components/main/smoke-cursor").then((mod) => {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/layout.tsx:18',message:'SmokeCursor dynamic import success',data:{timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      return { default: mod.SmokeCursor };
    }).catch((err) => {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/layout.tsx:22',message:'SmokeCursor dynamic import error',data:{error:err?.message,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      throw err;
    });
  },
  { ssr: false }
);

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default async function RootLayout({ children }: PropsWithChildren) {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/layout.tsx:27',message:'RootLayout entry',data:{timestamp:Date.now(),projectName:process.env.npm_package_name},sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  // Fetch navbar and footer data
  const [navbarData, footerData] = await Promise.all([
    sanityFetch<{
      _id: string;
      name?: string;
      logo?: { asset?: { url?: string }; alt?: string };
      navLinks?: Array<{ title: string; link: string }>;
      socialLinks?: Array<{ name: string; iconName?: string; link: string }>;
      sourceCodeLink?: string;
    }>({ query: NAVBAR_QUERY, revalidate: 60 }).catch(() => null),
    sanityFetch<{
      _id: string;
      columns?: Array<{
        title: string;
        links?: Array<{ name: string; iconName?: string; link: string }>;
      }>;
      copyrightText?: string;
    }>({ query: FOOTER_QUERY, revalidate: 60 }).catch(() => null),
  ]);

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden"
        )}
      >
        <Script
          id="chunk-fix"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  var checkWebpack = function() {
                    if (window.__webpack_require__ && window.__webpack_require__.e) {
                      var originalE = window.__webpack_require__.e;
                      window.__webpack_require__.e = function(chunkId) {
                        return originalE.apply(this, arguments).catch(function(err) {
                          if (err && err.message && (err.message.includes('chunk') || err.message.includes('ChunkLoadError'))) {
                            console.warn('ChunkLoadError detected, reloading page...');
                            setTimeout(function() { window.location.reload(); }, 100);
                          }
                          throw err;
                        });
                      };
                      return true;
                    }
                    return false;
                  };
                  if (!checkWebpack()) {
                    var interval = setInterval(function() {
                      if (checkWebpack()) {
                        clearInterval(interval);
                      }
                    }, 10);
                    setTimeout(function() { clearInterval(interval); }, 5000);
                  }
                }
              })();
            `,
          }}
        />
        <ChunkErrorHandler />
        <SmokeCursor />
        <StarsCanvas />
        <Navbar navbarData={navbarData} />
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}
