import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/lib/sanity/fetch";
import { NAVBAR_QUERY } from "@/lib/sanity/queries/navbar";
import { FOOTER_QUERY } from "@/lib/sanity/queries/footer";

const SmokeCursor = dynamic(
  () => import("@/components/main/smoke-cursor").then((mod) => ({ default: mod.SmokeCursor })),
  { ssr: false }
);

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default async function RootLayout({ children }: PropsWithChildren) {
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
        <SmokeCursor />
        <StarsCanvas />
        <Navbar navbarData={navbarData} />
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}
