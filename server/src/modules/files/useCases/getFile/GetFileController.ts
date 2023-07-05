import * as express from "express";
import { GetFile } from "./GetFile";

export class GetFileController {
  private getFileUseCase: GetFile;

  constructor(getFileUseCase: GetFile) {
    this.getFileUseCase = getFileUseCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const filename = req.params?.filename;

      if (!filename) {
        throw new Error("No filename provided");
      }

      const fileStream = await this.getFileUseCase.execute(filename);

      const writeableStream = new WritableStream({
        write(chunk) {
          res.write(chunk);
        },

        close() {
          res.end();
        },
      });

      fileStream.pipeTo(writeableStream);
    } catch (e) {
      console.error("e", e);
      res.sendStatus(500);
    }
  }
}
