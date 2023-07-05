import { IFileService } from "../../services/fileService";

type Response = ReadableStream;

export class GetFile {
  private fileService: IFileService;

  constructor(fileService: IFileService) {
    this.fileService = fileService;
  }

  public async execute(filename: string): Promise<Response> {
    return this.fileService.getFile(filename);
  }
}
