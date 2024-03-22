import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { ExceptionMessage } from 'src/utils/consts';

@Injectable()
export class FilesService {
  async createFile(
    file: Express.Multer.File,
    articleId: string,
  ): Promise<string> {
    try {
      const fileName = articleId + path.extname(file.originalname);
      const filePath = path.resolve(__dirname, '..', '..', 'article-images');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        ExceptionMessage.UPLOAD_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
