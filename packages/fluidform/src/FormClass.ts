import {makeAutoObservable, set, toJS} from "mobx"
import {merge, isEmpty, set as _set, debounce} from 'lodash'

export default class FormClass {

    errors = {};

    values = {};

    validator;

    constructor({ initialValues, validator }: {
        initialValues?: {[key: string]: any},
        validator?: (values: {[key: string]: any}, path: string) => {[key: string]: string}
    }) {
        this.values = initialValues || {}
        this.validator = validator || ((values, path) => ({}))
        makeAutoObservable(this)
    }

    async validateAll() {
        set(this.errors, await this.validator(this.values))
    }

    get isValid() {
        if(!this.validator) {
            return false
        }
        const errors = this.validator(this.values)
        return isEmpty(errors)
    }

    validatePath = debounce(async (path) => {
        this.setPathError(path, await this.validator(this.values, path))
    }, 300)

    setPathError(path, error) {
        _set(this.errors, path, error)
    }

    setValues(values) {
        this.values = merge(toJS(this.values), values)
    }

    setPathValue(path, value) {
        _set(this.values, path, value)
    }

    get raw() {
        return toJS(this.values)
    }

}
