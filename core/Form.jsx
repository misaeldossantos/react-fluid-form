import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import Context from './FormContext'

function Form({ children, validateOnBlur, form }) {

    if(!form) return children

    const {errors, values} = form

    const onBlur = useCallback( (path) => {
        if(validateOnBlur) {
            form.validatePath(path)
        }
    }, [validateOnBlur])

    return <Context.Provider
        value={{
            values,
            onBlur,
            errors,
            form
        }}
    >
        {children}
    </Context.Provider>
}

export default observer(Form)