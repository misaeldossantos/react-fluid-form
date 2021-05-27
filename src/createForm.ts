import { Validator } from "./../lib/types/index.d";
import { makeAutoObservable, set, toJS } from "mobx";
import { merge, isEmpty, set as _set, get as _get, cloneDeep } from "lodash";
import { FormObject } from "../lib/types/FormObject";

export default function ({
  initialValues,
  validator,
}: {
  initialValues?: { [key: string]: any };
  validator?: Validator;
}): FormObject {
  const form = {
    errors: {},
    values: initialValues || {},
    validator: validator || ((values, path = "") => ({})),
    async validateAll() {
      set(form.errors, await form.validator(form.values));
      return form.isValid;
    },

    get isValid() {
      if (!form.validator) {
        return false;
      }
      const errors = form.validator(form.values);
      return isEmpty(errors);
    },

    async validatePath(path: string) {
      form.setPathError(path, await form.validator(form.values, path));
      return !!form.getPathError(path);
    },

    setPathError(path, error) {
      _set(form.errors, path, error);
    },

    getPathValue(path) {
      return _get(form.values, path);
    },

    getPathError(path) {
      return _get(form.errors, path);
    },

    setValues(values) {
      form.values = toJS(values);
      form.validateAll();
    },

    mergeValues(values) {
      form.values = merge(toJS(form.values), toJS(values));
      form.validateAll();
    },

    setPathValue(path, value, validate = false) {
      _set(form.values, path, value);
      if (validate) {
        form.validatePath(path);
      }
    },

    get result() {
      return toJS(form.values);
    },

    clear() {
      form.values = cloneDeep(toJS(initialValues));
      form.clearErrors();
    },

    clearErrors() {
      form.errors = {};
    },
  };

  return makeAutoObservable(form);
}
