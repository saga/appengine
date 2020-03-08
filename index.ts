
import * as express from "express";
import { handleDataStore } from "./datastore";
import { readFeed } from "./rssparser";

const PORT = Number(process.env.PORT) || 8080;
const app = express();
app.enable('trust proxy');

app.get("/", (req, res) => {
  res.send("🎉 Hello TypeScript! 🎉");
});

app.get("/feed", async (req, res, next) => {
  await readFeed(req, res, next);
});

app.get("/job", (req, res) => {
  console.log("job done");
  res.send("done");
});

app.get('/store', async (req, res, next) => {
  await handleDataStore(req, res, next);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
