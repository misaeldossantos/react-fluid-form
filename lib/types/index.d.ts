import React from 'react'
import FormClass from '../../core/FormClass';

const Validator = (values, path) => {[key: string]: string}

export const useForm = (props: { initialValues: {[key: string]: any}, validator: Validator }) => FormClass

export const useYupValidator = (schema) => Validator 

export const Field = (props: {
    path: string,
    use: string,
    children: React.ReactChildren,
    onChange: (value) => void,
    displayValue: (value) => any,
    defaultValue: any,
    debounce: integer
}) => React.ReactElement

export const FormProvider = (props: {
    components: ({ [key: string]: {
        type: Function, 
        asChange?: string[],
        defaultValue?: any,
        asValue?: string 
    } })
}) => React.ReactElement

export const Form = (props: {
    children: React.ReactChildren, 
    validateOnBlur?: Function, 
    form: FormClass
}) => React.ReactElement