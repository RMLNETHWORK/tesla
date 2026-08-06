import fs from "node:fs";

const version = (process.env.CF_PAGES_COMMIT_SHA || "dev").slice(0, 7);

fs.writeFileSync(
    "version.json",
    JSON.stringify({ version }, null, 2)
);

console.log("Version:", version);