
import { FileObject } from './file';

// Temporary mock for missing CachingCompiler (should be replaced with Meteor's compiler base in real use)
class CachingCompiler {
  constructor(options: any) {
    // noop
  }

  processFilesForTarget(files: FileObject[]): void {
    // noop
  }
}

export interface IBaseHtmlCompiler {
  setDiskCacheDirectory(cacheDir: string): void;
  processFilesForTarget(files: FileObject[]): void;
  compileResultSize(result: any): number;
  compileOneFile(file: FileObject): any;
  compileOneFileLater?(file: FileObject, getResult: () => Promise<any>): void;
  addCompileResult(file: FileObject, result: any): void;
}

export class BaseHtmlCompiler extends CachingCompiler implements IBaseHtmlCompiler {
  constructor(compilerName: string) {
    super({
      compilerName,
      defaultCacheSize: 1024 * 1024 * 10,
    });
  }

  public getCacheKey(file: FileObject): string {
    return file.getSourceHash();
  }

  public setDiskCacheDirectory(cacheDir: string): void {
    // stubbed
  }

  public processFilesForTarget(files: FileObject[]): void {
    super.processFilesForTarget(files);
  }

  public compileResultSize(result: any): number {
    return JSON.stringify(result).length;
  }

  public compileOneFile(file: FileObject): any {
    return {};
  }

  public compileOneFileLater?(file: FileObject, getResult: () => Promise<any>): void {
    // optional stub
  }

  public addCompileResult(file: FileObject, result: any): void {
    // stubbed
  }
}
