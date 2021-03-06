import React from 'react'
import FormClass from '../../core/FormClass';

const Validator: (values, path) => {[key: string]: string}

export const useForm: (props: { initialValues: {[key: string]: any}, validator: Validator }) => FormClass

export const useYupValidator: (schema) => Validator 

export const Field: React.FC<{
    path: string,
    use: string,
    children: React.ReactChildren,
    onChange: (value) => void,
    displayValue: (value) => any,
    defaultValue: any,
    debounce: integer
}>

export const FormProvider: React.FC<{
    components: ({ [key: string]: {
        type: Function, 
        asChange?: string[],
        defaultValue?: any,
        asValue?: string 
    } })
}>

export const Form: React.FC<{
    children: React.ReactChildren, 
    validateOnBlur?: Function, 
    form: FormClass
}>