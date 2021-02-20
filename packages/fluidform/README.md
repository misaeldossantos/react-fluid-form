# React Fluid Form
<!-- colocar logo -->

react-fluid-form is a simple library that intents manage state and validation of forms. You can implement the valitation system, if you prefer. This library use mobx@6 to manage the state.

<!-- colocar sumário -->
<!-- colocar link codesandbox -->

## Install

``
	npm install -s react-fluid-form
``

or 

``
	yarn add react-fluid-form
``

## First look

First, you need wrap root element with FormProvider, that require components prop.

```tsx
	import React from 'react'
	import { FormProvider } from 'react-fluid-form'

	const App: React.FC = () => {
		return <FormProvider components={formComponents}>
			<div>
				<span>
					MyAPP
				</span>
			</div>
		</FormProvider>
	}

	export default App
```

"Components" prop is a object that has field types with  configuration, as how get value and what function call to get value

Example:
```ts

	const formComponents = {
		form: {
			checkbox: {
				type: Boolean, // checkbox fields receive this type
				asValue: 'checked', // get checkbox value with checked prop 
				defaultValue: false, // when created receive defaultValue
				asChange: ['onChange', ev => ev.target.value], // to get the value, it is needed call onChange function. The second value of array is optional, and represent function handler to get the value
			},
			// others type of fields, like textInput
		}
	}

```

## Form implementation

For implement the form manager, is necessary:

1. Wrap the form code with Form component.
2. Call useForm hook, passing the validator and initialValues (both optional)

```tsx
	// inside the component code
	const form = useForm({
		validator: null, // is optional
		initialValues: {
			person: {
				name: 'Unknown'
			}
		} // is optional
	})

	<Form
		form={form}
		validateOnBlur 
	>
		// jsx code
	</Form>
```

3. If you to want validate the form, pass the validator

```tsx

	// inside the component code
	const validator = useCallack((values, path: string) => {
		// values is a result object 
		// path is string path of field that need validation
		return {
			'person.name': "Field is required"
		}
		// return a object with key as path, and value error message
	}, [])

	const form = useForm({ validator })

```

React fluid form have a default validator hook, using yup library. You need install yup and pass schema:


```tsx
	// Example:
	import * as yup from 'yup'

	// inside the component code
	const validator = useYupValidator(schema)

	// outside the component code
	const schema = yup.object({
		person: yup.object({
			name: yup.string().required(),
			email: yup.email().required()
		})
	})
```

4. Finally, wrap the fields with Field component 

```tsx
	// inside the component code

	<Field
		path={"person.name"}
		use={"textInput"} // the component declared in components of FormProvider
	>
		<input name={"name"} placelholder={"Name"}/>
	</Field>
```

# FormClass

Calling useForm hook, returning FormClass. You can access attrs and methods to your neeeds:

```tsx
	interface FormClass {
		async validateAll(); // call this to validate all fields at the same time
		get isValid(): boolean; // return if form does not have any validation errors
		validatePath(path: string); // validate one field (example: person.name)
		setPathError(path: string, error: string); // set path error imperativle
		setValues(values: {[key: string]: any}); // set form values imperrati
		setPathValue(path: string, value: string); // set path value imperativle
		get raw(): {[key: string]: any}; // get the result object with all fields
	}

```

## Final example

App.tsx

```tsx
	import React from 'react'
	import { FormProvider } from 'react-fluid-form'
	import MyForm from './MyForm'

	const App: React.FC = () => {
		return <FormProvider components={components}>
			<MyForm />	
		</FormProvider>
	}

	const components = {
		form: {
			textInput: {
				type: String,
				asChange: ['onChange', ev => ev.target.value],
				defaultValue: ''
			},
			checkbox: {
				type: Boolean,
				asValue: 'checked',
				asChange: ['setValue'],
				defaultValue: false
			}
		}
	}
	
	export default App
```

MyForm.tsx

```tsx
	import React from 'react'
	import {
		useYupValidator, 
		useForm, 
		Field, 
		Form
	} from 'react-fluid-form'
	import * as yup from 'yup'
	import CheckBox from '../components/Checkbox'

	const MyForm: React.FC = () => {
		const validator = useYupValidator(schema)
		const form = useForm({ validator })

		const save = React.useCallack(() => {
			console.log(form.raw) // print the output object
		}, [form])

		return <Form
			form={form}
			validateOnBlur
		>
			<div>
				<h1>Person form</h1>
				<br/>

				<Field
					path={"person.name"}
					as={"textInput"}
				>
					<input 
						name={"name"} 
						placeholder={"Name"} 
					/>
				</Field>

				<Field
					path={"person.email"}
					as={"textInput"}
				>
					<input 
						name={"email"} 
						placeholder={"Email"}
						type={"email"} 
					/>
				</Field>

				<Field
					path={"acceptTerms"}
					as={"checkbox"}
				>
					<CheckBox
						label={"Accept terms"} 
					/>
				</Field>

				<button
					disabled={!form.isValid}
					onClick={save}
				>
					Save
				</button>
			</div>
		</Form>
	}

	const schema = yup.object({
		person: yup.object({
			name: yup.string().required(),
			email: yup.email().required()
		}),
		termsAccept: yup.boolean().required()
	})
```