
import {
  BaseHtmlCompiler,
  IBaseHtmlCompiler,
} from './base';

import {
  FileObject,
} from './file';

import {
  minify,
  clean,
} from './utils';

export interface ITemplateHtmlCompiler extends IBaseHtmlCompiler {
  compileContents(file: FileObject, contents: string): Promise<string>;
}

// Stub Babel for now
const Babel = {
  getDefaultOptions: () => ({
    sourceMaps: false,
    ast: false,
    presets: [],
    plugins: [],
  }),
};

const babelOptions = Babel.getDefaultOptions();

export class TemplateHtmlCompiler extends BaseHtmlCompiler implements ITemplateHtmlCompiler {
  constructor() {
    super('template-static-html-compiler');
  }

  public compileResultSize(result: any): number {
    return result.length;
  }

  public compileOneFileLater(file: FileObject, getResult: () => Promise<string>) {
    const path = file.getPathInPackage();
    file.addJavaScript({
      path,
    }, async () => {
      const data = await getResult();
      return {
        data,
      };
    });
  }

  public compileOneFile(file: FileObject): Promise<string> {
    const contents = file.getContentsAsString();

    if (process.env.NODE_ENV === 'development') {
      console.log(`Compiling: ${file.getPathInPackage()}`);
    }

    return this.compileContents(file, contents);
  }

  public async compileContents(file: FileObject, contents: string): Promise<string> {
    const minified = await minify(contents);
    return clean(minified);
  }
}
