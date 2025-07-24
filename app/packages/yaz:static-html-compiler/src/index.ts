import {
  IBaseHtmlCompiler,
} from './base';

import {
  MainHtmlCompiler,
} from './main';

import {
  TemplateHtmlCompiler,
  ITemplateHtmlCompiler,
} from './template';

import {
  extend,
  FileObject,
} from './file';

import * as utils from './utils';

import cheerio from 'cheerio';

export {
  MainHtmlCompiler,
  TemplateHtmlCompiler,
  ITemplateHtmlCompiler,
  utils,
};

export class StaticHtmlCompiler {
  private mainHtmlCompiler: IBaseHtmlCompiler;
  private templateHtmlCompiler: ITemplateHtmlCompiler;

  constructor(
    mainHtmlCompiler: IBaseHtmlCompiler,
    templateHtmlCompiler: ITemplateHtmlCompiler
  ) {
    this.mainHtmlCompiler = mainHtmlCompiler || new MainHtmlCompiler();
    this.templateHtmlCompiler = templateHtmlCompiler || new TemplateHtmlCompiler();
  }

  public setDiskCacheDirectory(directory: string) {
    this.mainHtmlCompiler.setDiskCacheDirectory(directory);
    this.templateHtmlCompiler.setDiskCacheDirectory(directory);
  }

  public processFilesForTarget(files: FileObject[]) {
    const mainFiles: any[] = [];
    const templateFiles: any[] = [];

    files.forEach((file) => {
      // Add helper methods
      extend(file);

      const $ = cheerio.load(file.getContentsAsString());
      const $contents = $;

      const isMain = $contents('head,body').length;
      const isTemplate = $contents(':not(head,body)').length;

      if (file.isNodeModule()) {
        templateFiles.push(file);
      } else {
        if (isMain && isTemplate) {
          const fileName = file.getBasename();
          const errorMsg = `${fileName} has wrong layout`;
          throw new Error(errorMsg);
        }

        if (isMain > 0) {
          mainFiles.push(file);
        } else {
          templateFiles.push(file);
        }
      }
    });

    return Promise.all([
      this.mainHtmlCompiler.processFilesForTarget(mainFiles),
      this.templateHtmlCompiler.processFilesForTarget(templateFiles),
    ]);
  }
}