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

export default FormProvider