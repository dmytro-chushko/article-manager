import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { ExceptionMessage } from 'src/utils/consts';

@Injectable()
export class FilesService {
  async createFile(
    file: Express.Multer.File,
    articleId: string,
  ): Promise<string> {
    const fileName = articleId + path.extname(file.originalname);
    const filePath = path.resolve(__dirname, '..', '..', 'article-images');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    await this.saveImage(path.join(filePath, fileName), file.buffer);

    return fileName;
  }

  private saveImage(path: string, buffer: Buffer): Promise<void> {
    return new Promise((resolve, reject) =>
      fs.writeFile(path, buffer, err => {
        if (err) {
          reject();

          throw new InternalServerErrorException(ExceptionMessage.UPLOAD_ERROR);
        }

        resolve();
      }),
    );
  }
}
