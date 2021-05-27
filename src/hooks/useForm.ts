import { useMemo } from "react";
import { Validator } from "../../lib/types";
import { FormObject } from "../../lib/types/FormObject";
import createForm from "../createForm";

export default function ({
  initialValues,
  validator,
}: {
  initialValues?: { [key: string]: any };
  validator?: Validator;
} = {}): FormObject {
  const form = useMemo(() => {
    return createForm({
      initialValues,
      validator,
    });
  }, [validator]);

  return form;
}
