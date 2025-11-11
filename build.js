const fs = require("fs");
const path = require("path");

// --- Config ---
const SITE_TITLE = "My Feed";
const INPUT_JSON = "index.json";
const OUTPUT_HTML = "index.html";
const STYLE_PATH = "style.css";

// --- Read posts ---
const raw = fs.readFileSync(INPUT_JSON, "utf-8");
const posts = JSON.parse(raw);

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
