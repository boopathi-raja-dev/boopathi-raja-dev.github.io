/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import type { ReactNode } from "react";
import { Footer } from "~/components/layout/Footer";
import { Nav } from "~/components/layout/Nav";
import { Spotlight } from "~/components/ui/Spotlight";
import { seo } from "~/lib/seo";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B1424" },
      ...seo(),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <LazyMotion features={domAnimation} strict>
          <Spotlight />
          <Nav />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </LazyMotion>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <section className="py-40 text-center">
      <p className="font-mono text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">This page doesn't exist.</h1>
      <Link to="/" className="mt-8 inline-block text-accent underline underline-offset-4">
        Back home
      </Link>
    </section>
  );
}
