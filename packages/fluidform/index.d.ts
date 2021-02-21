import { observer } from 'mobx-react-lite';
import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { makeAutoObservable, set, toJS, reaction } from 'mobx';
import { debounce, isEmpty, set as set$1, merge, get } from './node_modules/lodash/lodash.js';
import { Observer } from 'mobx-react';

class FormClass {
    constructor({ initialValues, validator }) {
        this.errors = {};
        this.values = {};
        this.validatePath = debounce(async (path) => {
            this.setPathError(path, await this.validator(this.values, path));
        }, 300);
        this.values = initialValues || {};
        this.validator = validator || ((values, path) => ({}));
        makeAutoObservable(this);
    }
    async validateAll() {
        set(this.errors, await this.validator(this.values));
    }
    get isValid() {
        if (!this.validator) {
            return false;
        }
        const errors = this.validator(this.values);
        return isEmpty(errors);
    }
    setPathError(path, error) {
        set$1(this.errors, path, error);
    }
    setValues(values) {
        this.values = merge(toJS(this.values), values);
    }
    setPathValue(path, value) {
        set$1(this.values, path, value);
    }
    get raw() {
        return toJS(this.values);
    }
}

//@ts-ignore
var Context = createContext({
    values: {},
    onBlur: () => { },
    errors: {},
    form: new FormClass({})
});

const Form = ({ children, validateOnBlur, validateOnChange, form }) => {
    if (!form)
        return children;
    const { errors, values } = form;
    const onBlur = useCallback((path) => {
        if (validateOnBlur) {
            form.validatePath(path);
        }
    }, [validateOnBlur]);
    const onChange = useCallback((path) => {
        if (validateOnChange) {
            form.validatePath(path);
        }
    }, [validateOnChange]);
    return React.createElement(Context.Provider, { value: {
            values,
            onBlur,
            onChange,
            errors,
            form
        } }, children);
};
var Form$1 = observer(Form);

var FormSettingsContext = createContext({ components: {} });

function useFormComponents () {
    const settings = useContext(FormSettingsContext);
    return useMemo(() => {
        return settings.components;
    }, [settings]);
}

function wrapperFunctions(...fns) {
    return function (...params) {
        for (let fn of fns) {
            if (fn) {
                fn(...params);
            }
        }
    };
}

const Field = ({ path, use, children, onChange, displayValue, defaultValue, ...otherProps }) => {
    const { form, values, errors, onBlur, onChange: onChangeContext, } = useContext(Context);
    const components = useFormComponents();
    const { ...props } = React.useMemo(() => {
        return { ...(components[use] || {}), ...otherProps };
    }, [components, use]);
    const { asValue = DEFAULTS.asValue, asChange = [], asOnBlur = DEFAULTS.asOnBlur.alias, } = props;
    const [changeAlias = DEFAULTS.asChange.alias] = asChange;
    const changeApply = React.useMemo(() => {
        if (!asChange[1]) {
            return DEFAULTS.asChange.apply;
        }
        if (typeof asChange[1] === "function") {
            return asChange[1];
        }
        else if (typeof asChange[1] === "string") {
            return (value) => get(value, asChange[1]);
        }
    }, [asChange]);
    const getDisplayValue = React.useCallback(() => {
        const value = get(values, path);
        return displayValue ? displayValue(value) : value;
    }, [displayValue]);
    const getInitialValue = React.useCallback(() => {
        return (getDisplayValue() || defaultValue || getInitialValueForType(props.type));
    }, [props.type]);
    const [localValue, setLocalValue] = useState(getInitialValue);
    useEffect(() => {
        return reaction(() => get(values, path), () => {
            setLocalValue(getDisplayValue());
        });
    }, []);
    const child = React.Children.only(children);
    return (React.createElement(Observer, null, () => React.cloneElement(child, {
        key: path,
        [asValue]: localValue,
        [changeAlias]: wrapperFunctions((...params) => form.setPathValue(path, changeApply(...params)), onChange, () => onChangeContext && onChangeContext(path)),
        [asOnBlur]: () => onBlur(path),
        error: get(errors, path),
    }, child.props.children)));
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
function getInitialValueForType(type = String) {
    switch (type) {
        case String:
            return "";
        case Number:
            return 0;
        case Boolean:
            return false;
    }
}

const FormProvider = ({ components, children }) => {
    return (React.createElement(FormSettingsContext.Provider, { value: {
            components,
        } }, children));
};

function useForm ({ initialValues, validator, } = {}) {
    return useMemo(() => {
        return new FormClass({
            initialValues,
            validator,
        });
    }, [validator]);
}

export { Field, Form$1 as Form, FormProvider, useForm };
