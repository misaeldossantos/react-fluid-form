import { useCallback } from 'react';
import { ValidationError } from 'yup';

function useYupValidator(schema) {
    return useCallback((values, path) => {
        if (path) {
            try {
                schema.validateSyncAt(path, values);
                return "";
            }
            catch (err) {
                if (err instanceof ValidationError) {
                    return err.message;
                }
                return {};
            }
        }
        try {
            schema.validateSync(values, {
                abortEarly: false,
            });
            return {};
        }
        catch (err) {
            const validationErrors = {};
            if (err instanceof ValidationError) {
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
            }
            return validationErrors;
        }
    }, [schema]);
}

export { useYupValidator };
