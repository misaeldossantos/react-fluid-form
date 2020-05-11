import {useMemo} from "react"
import {observable, set} from "mobx"
import FormClass from "../core/FormClass"

export default function({initialValues, validator} = {}) {
    return useMemo(() => {
        return new FormClass({
            initialValues,
            validator
        })
    }, [validator])
}