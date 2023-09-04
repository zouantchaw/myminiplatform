import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

const title =
  "myminiplatform - The all in one platform for personal and business use";
const description =
  "myminiplatform is a platform that allows you to create your own personal or business website, blog, store, and more. It's free to use and easy to get started.";
const image = "/myminiplatform.png";

export const metadata: Metadata = {
  title,
  description,
  icons: [
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdvcmtmbG93Ij48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4PSIzIiB5PSIzIiByeD0iMiIvPjxwYXRoIGQ9Ik03IDExdjRhMiAyIDAgMCAwIDIgMmg0Ii8+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgeD0iMTMiIHk9IjEzIiByeD0iMiIvPjwvc3ZnPg==",
  ],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@vercel",
  },
  metadataBase: new URL("https://vercel.pub"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-host="https://api.us-east.tinybird.co"
          data-token="p.eyJ1IjogIjEyN2U5NWY5LTJlODEtNDViMC1iM2M5LTMwYTZlYzY2OWNjZiIsICJpZCI6ICIzYzBiNTFhYy0xZDNiLTRjNzctOWJhMi04Zjg1ODJiNGNlNDAiLCAiaG9zdCI6ICJ1c19lYXN0In0.r7C0bxRrDtgZ0atJmi1S7IfuXxtxvvoQxfLxdyPq3hk"
        ></script>
      </head>
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
