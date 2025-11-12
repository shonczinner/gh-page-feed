# My Feed

A minimal static twitter-feed style blog generated from a single `index.json` file using Node.js.

## How to run locally

1. Make sure you have [Node.js](https://nodejs.org) installed.

2. Open a terminal in this project folder.

3. Run the build script:
   ```bash
   node build.js
   ```

4. You should see:
   ```
   ✅ index.html generated successfully.
   ```

5. Open `index.html` in your browser to view your feed.

##  How to host on github pages

deploy.yml file in the master/main branch file will run build.js and push index.html to branch gh-pages. All you need to do is ensure that your repository is set up to deploy from that branch (Settings->Pages->Deploy from a branch->gh-pages/(root))

In this case https://shonczinner.github.io/gh-page-feed/
