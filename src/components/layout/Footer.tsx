import { site } from "~/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-wrap justify-between gap-3 py-7 text-sm text-fog-400">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Built with TanStack Start · Deployed with GitHub Actions</p>
      </div>
    </footer>
  );
}
