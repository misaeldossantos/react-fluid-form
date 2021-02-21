import { createContext } from "react";
import FormClass from "./FormClass";

//@ts-ignore
export default createContext<{
	values: {[key: string]: any},
	onBlur: (path: string) => void,
	onChange?: (path: string) => void,
	errors: {[key: string]: any},
	form: FormClass,
}>({
	values: {},
	onBlur: () => {},
	errors: {},
	form: new FormClass({ })
})