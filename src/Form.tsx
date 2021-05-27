import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { FormObject } from "../lib/types/FormObject";
import Context from "./FormContext";

const Form: React.FC<{
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  form: FormObject;
}> = ({ children, validateOnBlur, validateOnChange, form }) => {
  if (!form) return children as React.ReactElement;

  const { errors, values } = form;

  const onBlur = useCallback(
    (path) => {
      if (validateOnBlur) {
        form.validatePath(path);
      }
    },
    [validateOnBlur]
  );

  const onChange = useCallback(
    (path) => {
      if (validateOnChange) {
        form.validatePath(path);
      }
    },
    [validateOnChange]
  );

  return (
    <Context.Provider
      value={{
        values,
        onBlur,
        onChange,
        errors,
        form,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default observer(Form);
