import { Injectable, Inject } from '@nestjs/common';
import * as Minio from 'minio';
import { extname } from 'path';
import { getOtp } from 'src/utility/utility';

@Injectable()
export class MinioGlobalService {
  constructor(
    @Inject('MINIO_CLIENT') private readonly minioClient: Minio.Client,
  ) {}

  async upload(
    bucketName: string,
    path: string,
    fileName: string,
    file: Buffer,
  ): Promise<{
    status: string;
    message_code: string;
    bucket: string;
    file: string;
  }> {
    try {
      const newFilename = await this.generateNewFilename(fileName);
      console.log("Bucket",bucketName)
      console.log("path",path)
      console.log("Newfilename",newFilename)
      const objectName = `${path}/${newFilename}`;
      await this.minioClient.putObject(
        bucketName,
        objectName,
        file,
        file.length,
      );
      return {
        status: 'success',
        message_code: 'upload_success',
        bucket: bucketName,
        file: objectName,
      };
    } catch (error) {
      return {
        status: 'un_success',
        message_code: 'upload_success',
        bucket: bucketName,
        file: fileName,
      };
    }
  }

  async getFile(
    bucketName: string,
    path: string,
    fileName: string,
  ): Promise<string> {
    const expiry = 24 * 60 * 60; // URL expiry time in seconds (e.g., 24 hours)
    const objectName = path ? `${path}/${fileName}` : fileName;
    const url = await this.minioClient.presignedGetObject(
      bucketName,
      objectName,
      expiry,
    );
    return url;
  }

  // Method to delete a file
  async deleteFile(bucketName: string, fileName: string): Promise<void> {
    await this.minioClient.removeObject(bucketName, fileName);
  }

  async generateNewFilename(oldFilename: string): Promise<string> {
    const extension = extname(oldFilename);
    const randomNum = await getOtp().toString();
    // const name = oldFilename.replace(extension, '');
    const timestamp = Date.now().toString(); // Get the current timestamp
    const newFilename = `${timestamp}${randomNum}${extension}`;
    return newFilename;
  }

  async checkConnection() {
    try {
      // Try to list the buckets
      const buckets = await this.minioClient.listBuckets();
      console.log(buckets);
      console.log('Minio connection successful. Buckets:', buckets);
      return true;
    } catch (error) {
      console.error('Error connecting to Minio:', error);
      return false;
    }
  }
}
