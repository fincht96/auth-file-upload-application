import { IFileService } from "../../services/fileService";

type Response = Map<string, Object>;

export class GetFilesList {
  private fileService: IFileService;

  constructor(fileService: IFileService) {
    this.fileService = fileService;
  }

  public async execute(): Promise<Response> {
    return this.fileService.getFiles();
  }
}
