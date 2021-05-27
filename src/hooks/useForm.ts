import { useMemo, useState } from "react";
import { Validator } from "../../lib/types";
import { FormObject } from "../../lib/types/FormObject";
import createForm from "../createForm";

export default function useForm({
  initialValues,
  validator,
}: {
  initialValues?: { [key: string]: any };
  validator?: Validator;
} = {}): FormObject {
  const [form] = useState(() => {
    return createForm({
      initialValues,
      validator,
    });
  });

  return form;
}
