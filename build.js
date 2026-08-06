import fs from "node:fs";

const version = (process.env.CF_PAGES_COMMIT_SHA || "dev").slice(0, 7);

const html = fs
  .readFileSync("index.template.html", "utf8")
  .replaceAll("{{VERSION}}", version);

fs.writeFileSync("index.html", html);

console.log(`Built version ${version}`);