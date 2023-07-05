import express from "express";

import { fileRouter } from "../../../../modules/files/infra/http/routes";

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "We're up and running!" });
});

router.use("/files", fileRouter);

export { router };
