import { get, set } from 'lodash'
import { observer } from 'mobx-react'
import React, { useContext, useState, useEffect } from 'react'
import useFormComponents from '../hooks/useFormComponents'
import Context from './FormContext'
import { wrapperFunctions } from './utils'
import { reaction } from 'mobx'

const Field: React.FC<{
    path: string,
    use: string,
    onChange: (value: any) => void,
    displayValue: any,
    defaultValue: any
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
        values,
        errors,
        onBlur
    } = useContext(Context)

    const components = useFormComponents("form")

    const { ...props } = React.useMemo(() => {
        return components[use] || otherProps
    }, [components, use])

    const {
        asValue = DEFAULTS.asValue,
        asChange = [],
        asOnBlur = DEFAULTS.asOnBlur.alias,
    } = props

    const [
        changeAlias = DEFAULTS.asChange.alias,
    ] = asChange

    const changeApply = React.useMemo(() => {
        if (!asChange[1]) {
            return DEFAULTS.asChange.apply
        }
        if (typeof asChange[1] === 'function') {
            return asChange[1]
        } else if (typeof asChange[1] === 'string') {
            return value => get(value, asChange[1])
        }
    }, [asChange])

    function getDisplayValue() {
        const value = get(values, path)
        return (displayValue ? displayValue(value) : value)
    }

    const getInitialValue = React.useCallback(() => {
        return getDisplayValue() || defaultValue || getInitialValueForType(props.type)
    }, [props.type])

    const [localValue, setLocalValue] = useState(getInitialValue)

    useEffect(() => {
        return reaction(() => get(values, path), () => {
            setLocalValue(getDisplayValue())
        })
    }, [])

    const bindProps = {
        [asValue]: localValue,
        [changeAlias]: wrapperFunctions(
            (...params) => set(values, path, changeApply(...params)),
            onChange
        ),
        [asOnBlur]: () => onBlur(path),
        error: get(errors, path)
    }

    const child: React.ReactElement = React.Children.only(children) as React.ReactElement

    return React.cloneElement(
        child,
        {
            key: path,
            ...bindProps
        },
        child.props.children
    )

}

const DEFAULTS = {
    asChange: {
        alias: 'onChange',
        apply: value => value
    },
    asValue: 'value',
    asOnBlur: {
        alias: 'onBlur'
    }
}

function getInitialValueForType(type: Function = String) {
    switch (type) {
        case String:
            return ""
        case Number:
            return 0;
        case Boolean:
            return false;
    }
}

export default observer(Field)
