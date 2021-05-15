import { makeAutoObservable, set, toJS } from "mobx"
import { merge, isEmpty, set as _set } from 'lodash'

export default class FormClass {

    errors;

    values;

    validator;

    constructor({ initialValues = {}, validator }) {
        this.values = initialValues
        this.errors = {}
        this.validator = validator
        makeAutoObservable(this)
    }

    async validateAll() {
        set(this.errors, await this.validator(this.values))
    }

    get isValid() {
        if (!this.validator) {
            return false
        }
        const errors = this.validator(this.values)
        return isEmpty(errors)
    }

    async validatePath(path) {
        this.setPathError(path, await this.validator(this.values, path))
    }

    setPathError(path, error) {
        _set(this.errors, path, error)
    }

    setValues(values) {
        this.values = toJS(values)
    }

    mergeValues(values) {
        this.values = merge(toJS(this.values), values)
    }

    setPathValue(path, value) {
        _set(this.values, path, value)
    }

    get raw() {
        return toJS(this.values)
    }

}
