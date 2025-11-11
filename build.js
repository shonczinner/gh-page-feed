const fs = require("fs");
const path = require("path");

// --- Config ---
const SITE_TITLE = "My Feed";
const INPUT_JSON = path.join(__dirname, "index.json");  // safe absolute path
const OUTPUT_HTML = path.join(__dirname, "index.html"); // root is fine
const STYLE_PATH = "style.css";

// --- Read posts ---
if (!fs.existsSync(INPUT_JSON)) {
  console.error(`❌ Could not find ${INPUT_JSON}`);
  process.exit(1);
}
const raw = fs.readFileSync(INPUT_JSON, "utf-8");
let posts = [];
try {
  posts = JSON.parse(raw);
} catch (err) {
  console.error("❌ Failed to parse index.json:", err);
  process.exit(1);
}

// --- Sort newest first ---
posts.sort((a, b) => new Date(b.created) - new Date(a.created));

// --- Build HTML ---
let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${SITE_TITLE}</title>
  <link rel="stylesheet" href="${STYLE_PATH}" />
</head>
<body>
  <main>
    <h1>${SITE_TITLE}</h1>
`;

// --- Add posts ---
for (const post of posts) {
  html += `
    <article class="post">
      <h2>${escapeHTML(post.title)}</h2>
      <p class="meta">🕒 ${post.created}${post.tags?.length ? ` | #${post.tags.join(", #")}` : ""}</p>
      <p class="body">${escapeHTML(post.text)}</p>
    </article>
  `;
}

// --- Close HTML ---
html += `
  </main>
</body>
</html>
`;

// --- Write file ---
fs.writeFileSync(OUTPUT_HTML, html);
console.log(`✅ ${OUTPUT_HTML} generated successfully.`);

// --- Utility ---
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
