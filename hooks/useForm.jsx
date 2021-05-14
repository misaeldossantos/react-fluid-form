import { useState } from "react"
import { observable, set } from "mobx"
import FormClass from "../core/FormClass"

export default function ({ initialValues, validator } = {}) {
    return useState(() => {
        return new FormClass({
            initialValues,
            validator
        })
    })
}