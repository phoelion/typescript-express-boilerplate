import { UploadedFile } from 'express-fileupload';
import { hashFromUUID } from './hash.service';
import { join } from 'path';
const ROOT_PATH: string = process.cwd();
const CONTENT_PATH = '/public/';
export default class UploadService {
  private readonly basePath: string;
  constructor() {
    this.basePath = join(ROOT_PATH, CONTENT_PATH);
  }

  public async upload(file: UploadedFile): Promise<string> {
    const fileNewName: string = this.generateNewName(file.name);
    await file.mv(`${this.basePath}${fileNewName}`);
    return fileNewName;
  }

  public async uploadMany(files: UploadedFile[]): Promise<string[]> {
    const newFilesNames: string[] = [];
    for (let index = 0; index < files.length; index++) {
      const newFileName = await this.upload(files[index]);
      newFilesNames.push(newFileName);
    }
    return newFilesNames;
  }

  private generateNewName(fileName: string): string {
    const fileExtension: string = fileName.split('.').pop() as string;
    const newFileName: string = hashFromUUID();
    return `${newFileName}.${fileExtension}`;
  }
}
