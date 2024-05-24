import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageOptions } from 'helpers/config';

@Controller('upload')
export class UploadController {
  @Post('post')
  @UseInterceptors(
    FilesInterceptor('files', 10, { storage: storageOptions('post') }),
  )
  uploadPostFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadedFiles = files.map((file) => ({
      url: `http://localhost:5000/api/uploads/post/${file.filename}`,
      name: file.filename,
      status: 'done',
      uid: file.filename,
    }));

    return { files: uploadedFiles };
  }

  @Post('avatar')
  @UseInterceptors(
    FilesInterceptor('files', 1, { storage: storageOptions('avatar') }),
  )
  uploadAvatarFile(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadedFiles = files.map((file) => ({
      url: `http://localhost:5000/api/uploads/avatar/${file.filename}`,
      name: file.filename,
      status: 'done',
      uid: file.filename,
    }));
    return { files: uploadedFiles };
  }
}
