const { fromIni } = require("@aws-sdk/credential-providers");
import { S3Client } from "@aws-sdk/client-s3";

// Set the AWS Region.
const REGION = "eu-north-1"; //e.g. "us-east-1"s

const bucketName = process.env.S3_BUCKET;

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  credentials: fromIni({ profile: process.env.AWS_CREDENTIALS }),
});

export { s3Client, bucketName };
