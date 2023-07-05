export interface UploadFileProps {
  filename: string;
  content: Buffer;
}

export interface IFileService {
  uploadFile(props: UploadFileProps): Promise<void>;
  getFiles(): Promise<Map<string, Object>>;
  getFile(filename: string): Promise<ReadableStream>;
}
