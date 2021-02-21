import { get } from "lodash";
import { reaction } from "mobx";
import { Observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import Context from "./FormContext";
import useFormComponents from "./hooks/useFormComponents";
import { wrapperFunctions } from "./utils";

const Field: React.FC<{
  path: string;
  use: string;
  onChange?: (value: any) => void;
  displayValue?: any;
  defaultValue?: any;
}> = ({
  path,
  use,
  children,
  onChange,
  displayValue,
  defaultValue,
  ...otherProps
}) => {
  const {
    form,
    values,
    errors,
    onBlur,
    onChange: onChangeContext,
  } = useContext(Context);

  const components = useFormComponents();

  const { ...props } = React.useMemo(() => {
    return { ...(components[use] || {}), ...otherProps };
  }, [components, use]);

  const {
    asValue = DEFAULTS.asValue,
    asChange = [],
    asOnBlur = DEFAULTS.asOnBlur.alias,
  } = props as any;

  const [changeAlias = DEFAULTS.asChange.alias] = asChange;

  const changeApply = React.useMemo(() => {
    if (!asChange[1]) {
      return DEFAULTS.asChange.apply;
    }
    if (typeof asChange[1] === "function") {
      return asChange[1];
    } else if (typeof asChange[1] === "string") {
      return (value) => get(value, asChange[1]);
    }
  }, [asChange]);

  const getDisplayValue = React.useCallback(() => {
    const value = get(values, path);
    return displayValue ? displayValue(value) : value;
  }, [displayValue]);

  const getInitialValue = React.useCallback(() => {
    return (
      getDisplayValue() || defaultValue || getInitialValueForType(props.type)
    );
  }, [props.type]);

  const [localValue, setLocalValue] = useState(getInitialValue);

  useEffect(() => {
    return reaction(
      () => get(values, path),
      () => {
        setLocalValue(getDisplayValue());
      }
    );
  }, []);

  const child: React.ReactElement = React.Children.only(
    children
  ) as React.ReactElement;

  return (
    <Observer>
      {() =>
        React.cloneElement(
          child,
          {
            key: path,
            [asValue]: localValue,
            [changeAlias]: wrapperFunctions(
              (...params) => form.setPathValue(path, changeApply(...params)),
              onChange,
              () => onChangeContext && onChangeContext(path)
            ),
            [asOnBlur]: () => onBlur(path),
            error: get(errors, path),
          },
          child.props.children
        )
      }
    </Observer>
  );
};

const DEFAULTS = {
  asChange: {
    alias: "onChange",
    apply: (value) => value,
  },
  asValue: "value",
  asOnBlur: {
    alias: "onBlur",
  },
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

export default Field;
