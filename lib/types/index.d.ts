import React from 'react'
import { StyleProp, ScrollViewProps, View, ViewProps } from 'react-native';
import FormClass from '../../core/FormClass';

type Validator = (values, path) => {[key: string]: string}

export type useForm = (props: { initialValues: {[key: string]: any}, validator: Validator }) => FormClass

export type useYupValidator = (schema) => Validator 

export type Field = (props: {
    path: string,
    use: string,
    children: React.ReactChildren,
    onChange: (value) => void,
    displayValue: (value) => any,
    defaultValue: any,
    debounce: integer
}) => React.ReactElement

export type FormProvider = (props: {
    components: ({ [key: string]: {
        type: Function, 
        asChange?: string[],
        defaultValue?: any,
        asValue?: string 
    } })
}) => React.ReactElement

export type Form = (props: {
    children: React.ReactChildren, 
    validateOnBlur?: Function, 
    form: FormClass
}) => React.ReactElement