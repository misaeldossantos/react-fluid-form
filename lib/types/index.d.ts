import React from "react";
import { FormObject } from "./FormObject";

export type Validator = (
  values: { [key: string]: any },
  path: string
) => { [key: string]: string } | string | undefined;

export const useForm: (props: {
  initialValues?: { [key: string]: any };
  validator?: Validator;
}) => FormObject;

export const useYupValidator: (schema) => Validator;

export const Field: React.FC<{
  path: string;
  use: string;
  onChange?: (value) => void;
  displayValue?: (value) => any;
  defaultValue?: any;
  debounce?: number;
}>;

export const FormProvider: React.FC<{
  components: {
    [key: string]: {
      type?: Function;
      asChange?: any[];
      defaultValue?: any;
      asValue?: string;
    };
  };
}>;

export const Form: React.FC<{
  validateOnBlur?: boolean;
  form: FormObject;
}>;

export function useFormChangeEffect(
  callback: (value: any) => void,
  path: string,
  deps: any[]
);
