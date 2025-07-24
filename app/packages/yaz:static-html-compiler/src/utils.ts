import { minify as htmlMinify } from 'html-minifier-terser'; // Replacing deprecated html-minifier

export async function minify(contents: string): Promise<string> {
  return await htmlMinify(contents, {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: false,
    minifyJS: true,
    minifyCSS: true
  });
}

export function clean(contents: string): string {
  return contents.replace(/\/\*\s*@ngInject\s*\*/g, '');
}