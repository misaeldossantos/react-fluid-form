export interface FormObject {
  isValid: boolean;
  result: { [key: string]: any };
  values: { [key: string]: any };
  errors: { [key: string]: string };
  validateAll(): Promise<boolean>;
  validatePath(path: string): Promise<boolean>;
  setPathError(path: string, error: string): void;
  getPathValue(path: string): any;
  getPathError(path: string): string;
  setValues(values: { [key: string]: any }): void;
  mergeValues(values: { [key: string]: any }): void;
  clear(): void;
  clearErrors(): void;
}
