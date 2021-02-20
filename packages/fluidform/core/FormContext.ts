import { createContext } from "react";
import FormClass from "./FormClass";

export default createContext<{
	values: {[key: string]: any},
	onBlur: (path: string) => void,
	errors: string[],
	form: FormClass,
}>(null)