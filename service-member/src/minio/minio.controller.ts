import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Get,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { File } from 'multer'; // Import Multer from 'multer'
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Files')
@Controller('files')
export class MinioController {
  constructor(private readonly minioClientService: MinioService) {}

  // ...

  // @Public()
  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('file')) // Use FilesInterceptor
  // async uploadedFile(@UploadedFiles() files: File[], @Body() body) {
  //   // Use @UploadedFiles()
  //   // console.log(files);
  //   const { product_id, bucketName, path } = body;
  //   for (let i = 0; i < files.length; i++) {
  //     await this.minioClientService.upload(
  //       product_id,
  //       bucketName,
  //       path,
  //       files[i].originalname,
  //       files[i].buffer,
  //     );
  //   }
  //   return {
  //     status: 200,
  //     message: 'Files uploaded successfully',
  //   };
  // }

  @Public()
  @Get()
  getHello(): string {
    return 'Minio is running !!';
  }

  @Public()
  @Get('getFile')
  async getFile(
    @Query('bucketName') bucketName: string,
    @Query('fileName') fileName: string,
    @Query('path') path: string, // Add this line
  ): Promise<string> {
    return await this.minioClientService.getFile(bucketName, path, fileName); // Update this line
  }

  @Delete(':bucketName/:fileName') // Corrected route parameter
  async deleteFile(
    @Param('bucketName') bucketName: string, // Removed 'property' and 'pipes'
    @Param('fileName') fileName: string,
  ): Promise<{ message: string }> {
    await this.minioClientService.deleteFile(bucketName, fileName);
    return { message: 'File deleted successfully' };
  }
}
