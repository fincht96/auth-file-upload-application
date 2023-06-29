import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  console.log("connected to mongo db successfully");

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
}
