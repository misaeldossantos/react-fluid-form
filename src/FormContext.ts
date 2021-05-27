import { createContext } from "react";
import { FormObject } from "../lib/types/FormObject";

//@ts-ignore
export default createContext<{
  values: { [key: string]: any };
  onBlur: (path: string) => void;
  onChange?: (path: string) => void;
  errors: { [key: string]: any };
  form: FormObject;
}>(null);
