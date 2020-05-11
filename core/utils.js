
export function wrapperFunctions(...fns) {
    return function(...params) {
        for(let fn of fns) {
            if(fn) {
                fn(...params)
            }
        }
    }
}