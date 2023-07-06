import * as express from "express";
import { GetFilesList } from "./GetFilesList";

export class GetFilesListController {
  private getFilesListUseCase: GetFilesList;

  constructor(getFilesListUseCase: GetFilesList) {
    this.getFilesListUseCase = getFilesListUseCase;
  }

  public async execute(req: express.Request, res: express.Response) {
    try {
      const list = await this.getFilesListUseCase.execute();
      let listArray = [];

      for (const [_, value] of list) {
        listArray.push(value);
      }

      res.send(JSON.stringify(listArray));
    } catch (e) {
      console.error("e", e);
      res.sendStatus(500);
    }
    //
  }
}
