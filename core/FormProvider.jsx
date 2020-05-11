import React from 'react'
import FormSettingsContext from './FormSettingsContext'

function FormProvider({
    components = {},
    children
}) {

    return <FormSettingsContext.Provider
        value={{
            components
        }}
    >
        {children}
    </FormSettingsContext.Provider>
}

/*
    components = {
        form: {
            textInput: props
        }
    }
*/

export default FormProvider