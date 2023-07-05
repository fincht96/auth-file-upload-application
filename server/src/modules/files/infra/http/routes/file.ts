import express from "express";
import { fileUploadController } from "../../../useCases/fileUpload";
import { getFilesListController } from "../../../useCases/getFilesList";
import { getFileController } from "../../../useCases/getFile";
import { middleware } from "../../../../../shared/infra/http/utils/middleware";

const fileRouter = express.Router();

fileRouter.get("/", (req, res) => {
  return getFilesListController.execute(req, res);
});

fileRouter.get("/:filename", (req, res) => {
  return getFileController.execute(req, res);
});

fileRouter.post("/", middleware.uploadSingle("new-file"), (req, res) => {
  return fileUploadController.execute(req, res);
});

export { fileRouter };
