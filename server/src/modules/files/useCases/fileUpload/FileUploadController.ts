import * as express from "express";
import { FileUpload } from "./FileUpload";

export class FileUploadController {
  private fileUploadUseCase: FileUpload;

  constructor(fileUploadUseCase: FileUpload) {
    this.fileUploadUseCase = fileUploadUseCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const file = req.file;

      if (!file) {
        throw new Error("No upload file provided");
      }

      await this.fileUploadUseCase.execute(file.originalname, file.buffer);

      res.sendStatus(200);
    } catch (e) {
      console.error("e", e);
      res.sendStatus(500);
    }
    //
  }
}
