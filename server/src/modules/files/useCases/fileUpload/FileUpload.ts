import { IFileService } from "../../services/fileService";

type Response = void;

export class FileUpload {
  private fileService: IFileService;

  constructor(fileService: IFileService) {
    this.fileService = fileService;
  }

  public async execute(filename: string, content: Buffer): Promise<Response> {
    return this.fileService.uploadFile({ filename, content });
  }
}
