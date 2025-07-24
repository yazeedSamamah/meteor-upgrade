export interface FileObject {
  getContentsAsString(): string;
  getBasename(): string;
  getPackageName(): string;
  getPathInPackage(): string;
  getPackagePrefix(): string;
  getTemplateUrl(): string;
  getTemplateJS(): string;
  getSourceHash(): string;
  getArch(): string;
  isNodeModule(): boolean;
  addHtml(options: any): void;
  addJavaScript(options: any, resultPromise?: any): void;
}

const fileMixin = {
  getPackagePrefix(this: FileObject): string {
    const packageName = this.getPackageName();
    return packageName ? `packages/${packageName}/` : '';
  },

  getTemplateUrl(this: FileObject): string {
    return this.getPackagePrefix() + this.getPathInPackage();
  },

  getTemplateJS(this: FileObject): string {
    return `${this.getTemplateUrl()}.js`;
  },

  isNodeModule(this: FileObject): boolean {
    return !!this.getPathInPackage().startsWith('node_modules');
  },
};

export function extend(file: FileObject) {
  Object.assign(file, fileMixin);
}
