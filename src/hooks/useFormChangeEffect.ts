import { reaction } from "mobx";
import { useContext, useEffect } from "react";
import FormContext from "../FormContext";

export default function (callback, path, deps = []) {
  const { form } = useContext(FormContext);
  useEffect(() => {
    return reaction(() => form.getPathValue(path), callback);
  }, [path, ...deps]);
}
