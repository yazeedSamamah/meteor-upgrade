import {
  BaseHtmlCompiler,
  IBaseHtmlCompiler,
} from './base';

import {
  FileObject,
} from './file';

import * as cheerio from 'cheerio';

export interface Section {
  contents: string;
  attrs?: Record<string, string>;
}

export interface CompileResult {
  head: Section;
  body: Section;
}

export class MainHtmlCompiler extends BaseHtmlCompiler implements IBaseHtmlCompiler {
  constructor() {
    super('main-static-html-compiler');
  }

  public compileResultSize(result: CompileResult): number {
    return result.head.contents.length + result.body.contents.length;
  }

  public compileOneFile(file: FileObject): CompileResult {
    const $ = cheerio.load(file.getContentsAsString());
    const $head = $('head');
    const $body = $('body');

    let bodyAttrs: Record<string, string> | undefined = undefined;
    const bodyEl = $body.get(0);

    if (bodyEl && 'attribs' in bodyEl) {
      bodyAttrs = (bodyEl as cheerio.TagElement).attribs;
    }

    return {
      head: {
        contents: $head.html() || '',
      },
      body: {
        contents: $body.html() || '',
        attrs: bodyAttrs,
      },
    };
  }

  public addCompileResult(file: FileObject, result: CompileResult) {
    file.addHtml({
      data: result.head.contents,
      section: 'head',
    });

    file.addHtml({
      data: result.body.contents,
      section: 'body',
    });

    if (result.body.attrs) {
      file.addJavaScript({
        path: file.getTemplateJS(),
        data: `
          Meteor.startup(function() {
            var attrs = ${JSON.stringify(result.body.attrs)};
            for (var prop in attrs) {
              document.body.setAttribute(prop, attrs[prop]);
            }
          });
        `,
      });
    }
  }
}
