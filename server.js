import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy route
app.get("*", async (req, res) => {
  try {
    const targetUrl = "https://classic.minecraft.net" + req.url;

    const response = await fetch(targetUrl);
    let body = await response.text();

    // Replace tab title
    body = body.replace(/<title>.*<\/title>/, "<title>PowerSchool</title>");

    // Replace favicon
    body = body.replace(
      /<link rel="icon".*?>/,
      `<link rel="icon" type="image/png" href="https://ps.powerschool-docs.com/_media/common/powerschool-logo.png">`
    );

    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
