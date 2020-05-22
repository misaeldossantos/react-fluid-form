import {action, computed, observable, set, toJS} from "mobx"
import {merge, isEmpty, set as _set} from 'lodash'

export default class FormClass {

    @observable
    errors = {};

    @observable
    values = {};

    validator;

    constructor({ initialValues, validator }) {
        this.values = initialValues || {}
        this.validator = validator
    }

    @action
    async validateAll() {
        set(this.errors, await this.validator(this.values))
    }

    @computed
    get isValid() {
        if(!this.validator) {
            return false
        }
        const errors = this.validator(this.values)
        return isEmpty(errors)
    }

    @action
    async validatePath(path) {
        this.setPathError(path, await this.validator(this.values, path))
    }

    @action
    setPathError(path, error) {
        _set(this.errors, path, error)
    }

    @action
    setValues(values) {
        this.values = merge(toJS(this.values), values)
    }

    @action
    setPathValue(path, value) {
        set(this.values, path, value)
    }

    @computed
    get raw() {
        return toJS(this.values)
    }

}
