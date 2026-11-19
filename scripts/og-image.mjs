/**
 * Renders the social preview image (public/og.png, 1200×630) from HTML with Playwright.
 * Run after changing the headline:  node scripts/og-image.mjs
 */
import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(`node_modules/@fontsource-variable/${pkg}/files/${file}`).toString("base64")}`;
const avatar = `data:image/webp;base64,${readFileSync("public/avatar.webp").toString("base64")}`;

const html = `<!doctype html><html><head><style>
@font-face{font-family:SG;src:url(${font("space-grotesk", "space-grotesk-latin-wght-normal.woff2")})}
@font-face{font-family:IN;src:url(${font("inter", "inter-latin-wght-normal.woff2")})}
@font-face{font-family:JB;src:url(${font("jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2")})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0b1424;color:#fff;font-family:IN;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgb(125 211 252/.06) 1px,transparent 1px),linear-gradient(90deg,rgb(125 211 252/.06) 1px,transparent 1px);background-size:48px 48px}
.glow{position:absolute;width:760px;height:760px;right:-220px;top:-260px;background:radial-gradient(circle,rgb(125 211 252/.16),transparent 65%)}
.wrap{position:relative;padding:72px 80px;height:100%;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:18px}
.top img{width:64px;height:64px;border-radius:50%;border:2px solid #22344f}
.name{font-family:SG;font-weight:700;font-size:30px}
.tag{font-family:JB;color:#7dd3fc;font-size:26px}
.eyebrow{margin-top:56px;font-weight:600;letter-spacing:4px;color:#7dd3fc;font-size:20px;text-transform:uppercase}
h1{margin-top:18px;font-family:SG;font-weight:700;font-size:68px;line-height:1.05;letter-spacing:-1.5px;max-width:900px}
h1 span{color:#7dd3fc}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:22px;color:#a9b8cc}
.chips{display:flex;gap:10px}
.chip{border:1px solid #22344f;border-radius:999px;padding:8px 16px;font-size:18px;color:#cbd5e1}
.url{font-family:JB;color:#7dd3fc}
</style></head><body><div class="grid"></div><div class="glow"></div>
<div class="wrap">
  <div class="top"><img src="${avatar}"/><span class="tag">&lt;/&gt;</span><span class="name">Boopathi Raja</span></div>
  <p class="eyebrow">Frontend Engineer · Chennai</p>
  <h1>I build the <span>frontends</span> complex businesses run on.</h1>
  <div class="foot">
    <div class="chips"><span class="chip">React</span><span class="chip">TypeScript</span><span class="chip">AWS Certified</span></div>
    <span class="url">boopathi-raja-dev.github.io</span>
  </div>
</div></body></html>`;

const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });
await browser.close();
console.log("Wrote public/og.png");
