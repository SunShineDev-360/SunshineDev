import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";

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
  () => import("@/components/main/smoke-cursor").then((mod) => ({
    default: mod.SmokeCursor,
  })),
  { 
    ssr: false,
    loading: () => null, // Don't show anything while loading
  }
);

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default async function RootLayout({ children }: PropsWithChildren) {
  // Fetch navbar and footer data with error handling
  let navbarData = null;
  let footerData = null;
  
  try {
    [navbarData, footerData] = await Promise.all([
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
  } catch (error) {
    // Silently handle errors - components will use fallback constants
    console.error('Error fetching navbar/footer data:', error);
  }

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
        <Toaster position="bottom-center" />
        <Navbar navbarData={navbarData} />
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}
