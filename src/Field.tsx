import _, { get } from "lodash";
import { observer } from "mobx-react";
import React, { useContext, useMemo, useState } from "react";
import Context from "./FormContext";
import useFormChangeEffect from "./hooks/useFormChangeEffect";
import useFormComponent from "./hooks/useFormComponent";
import { wrapperFunctions } from "./utils";

const Field: React.FC<FieldTypes> = (initialProps) => {
  const {
    path,
    use,
    children,
    onChange,
    displayValue,
    defaultValue,
    debounce = 0,
    uncontrolled,
    ...otherProps
  } = initialProps;

  const { form, onBlur, onChange: onChangeContext } = useContext(Context);

  const componentProps = useFormComponent(use);

  // merge props
  const props = { ...componentProps, ...otherProps };

  const {
    asValue = DEFAULTS.asValue,
    asChange = DEFAULTS.asChange,
    asOnBlur = DEFAULTS.asOnBlur,
  } = props;

  const [changeAlias = DEFAULTS.asChange[0]] = asChange;

  const applyChange = React.useMemo(() => {
    const fn = asChange[1] || DEFAULTS.asChange[1];

    return typeof fn === "function" ? fn : (value) => value;
  }, [asChange]);

  const getDisplayValue = React.useCallback(
    (value = "") =>
      displayValue
        ? typeof displayValue === "function"
          ? displayValue(value)
          : get(value, displayValue)
        : value,
    [displayValue]
  );

  const [localValue, setLocalValue] = useState(() => {
    return getDisplayValue(form.getPathValue(path) || defaultValue || getInitialValueForType(props.type));
  });

  useFormChangeEffect(
    (value) => !uncontrolled && setLocalValue(getDisplayValue(value)),
    path,
    [uncontrolled]
  );

  // bindings
  const bindOnChange = useMemo(() => {
    return wrapperFunctions(
      (...params) => form.setPathValue(path, applyChange(...params)),
      _.debounce(() => onChangeContext(path), DEBOUNCE_VALIDATION),
      onChange
    );
  }, [onChange, path, debounce]);

  const bindOnBlur = useMemo(() => {
    return _.debounce(() => onBlur(path), DEBOUNCE_VALIDATION);
  }, [path]);

  const child = React.Children.only(children) as React.ReactElement;

  const newProps = {
    key: path,
    [changeAlias]: bindOnChange,
    [asOnBlur as string]: bindOnBlur,
    error: form.getPathError(path),
  };

  if (!uncontrolled) {
    newProps[asValue] = localValue;
  }

  return React.cloneElement(child, newProps, child.props.children);
};

const DEBOUNCE_VALIDATION = 200;

const DEFAULTS = {
  asChange: ["onChange", (value) => value],
  asValue: "value",
  asOnBlur: "onBlur",
};

function getInitialValueForType(type: Function = String) {
  switch (type) {
    case String:
      return "";
    case Number:
      return 0;
    case Boolean:
      return false;
  }
}

export type FieldTypes = {
  path: string;
  use: string;
  onChange?: (value: any) => void;
  displayValue?: (value: any) => any | string;
  defaultValue?: any;
  debounce?: number;
  uncontrolled?: boolean;
};

export default observer(Field);
