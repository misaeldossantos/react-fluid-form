import { useMemo } from "react";
import FormClass from "../core/FormClass";

export default function ({
  initialValues,
  validator,
}: {
  initialValues?: { [key: string]: any };
  validator?: (
    values: { [key: string]: any },
    path: string
  ) => { [key: string]: string };
} = {}) {
  return useMemo(() => {
    return new FormClass({
      initialValues,
      validator,
    });
  }, [validator]);
}
