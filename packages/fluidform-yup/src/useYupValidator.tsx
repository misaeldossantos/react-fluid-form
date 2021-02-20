import { useCallback } from "react";
import * as yup from 'yup';

export default function useYupValidator(schema) {

    return useCallback((values, path) => {
        if (path) {
            try {
                schema.validateSyncAt(path, values)
                return ""
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    return err.message
                }
                return null
            }
        }

        try {
            schema.validateSync(values, {
                abortEarly: false,
            });
            return {}
        } catch (err) {
            const validationErrors = {};
            if (err instanceof yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
            }
            return validationErrors
        }
    }, [schema])

}