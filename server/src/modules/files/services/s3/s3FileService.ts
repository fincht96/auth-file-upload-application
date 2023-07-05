import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { IFileService, UploadFileProps } from "../fileService";
import { s3Client as client, bucketName } from "./config";

export class S3FileService implements IFileService {
  async getFile(filename: string): Promise<ReadableStream> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: filename,
    });
    const item = await client.send(command);
    const stream = item?.Body?.transformToWebStream();

    if (!stream) {
      throw new Error("Unable to create readable stream for js file");
    }

    return stream;
  }
  async uploadFile(props: UploadFileProps): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: props.filename,
      Body: props.content,
    });
    await client.send(command);
  }

  async getFiles(): Promise<Map<string, Object>> {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      // The default and maximum number of keys returned is 1000.
    });

    let isTruncated = true;
    let data = new Map<string, Object>();

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);

      Contents?.forEach((el) => {
        data.set(`${el.Key}`, { ...el });
      });

      isTruncated = !!IsTruncated;

      command.input.ContinuationToken = NextContinuationToken;
    }

    return data;
  }
}
