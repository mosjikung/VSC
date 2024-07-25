import { ClientOptions } from 'minio';
import { config } from 'dotenv';

config();

export const minioClientOptions: ClientOptions = {
  endPoint: process.env.MINIO_ENDPOINT,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
};
