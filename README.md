# React Fluid Form

### Reactive forms for react and react native, using hooks and Mobx@6

![npm version](https://img.shields.io/npm/v/react-fluid-form) ![downloads](https://img.shields.io/npm/dt/react-fluid-form)

## Installation:

```bash
npm install -s react-fluid-form mobx mobx-react yup lodash
// or:
yarn add react-fluid-form mobx mobx-react yup lodash
```

## Inspiration

I made this library for particular use, because some libraries I used did not satisfy me: formik, mobx-react-form, unform. Some features are inspired by these libs.
\
\
The purpose of this library is to be easy to use, with hooks and mobx, which in my use proved to be more performative. Validation is completely optional and customizable. I hope it helps who needs something like this.
\
\
I used Mobx for store the state (https://mobx.js.org)


[![Edit fluid-form-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/fluid-form-example-ksbq0?fontsize=14&hidenavigation=1&theme=dark)

## Quick start

### Table of Contents

- [1. Initial configuration](#1-initial-configuration)
  - [1.1 Define components](#11-define-components)
  - [1.2 Add \<FormProvider />](#12-add-formprovider-)
- [2. Create your form](#2-create-your-form)
  - [2.1 Call useForm hook](#21-call-useform-hook)
  - [2.2 Validate the form](#22-validate-the-form)
  - [2.3 Wrap your component with \<Form />](#23-wrap-your-component-with-form-)
  - [2.3 Wrap your field with \<Field />](#23-wrap-your-field-with-field-)
- [3. Form instance](#3-form-instance)
- [Contributions](#contributions)


### 1. Initial configuration
#### 1.1 Define components

First, you need to create a `bind components` object, that tells to library how pass props to field component (like \<input />):

```typescript

const components = {
  form: {
    textInput: {
      asValue: "value", // how pass value to field (default is "value")
      asChange: ["onChange", ev => ev.target.value], // event for onChange (default is "onChange")
      defaultValue: "", 
      type: String,
      asBlur: ["onBlur"] // event for onBlur (default is "onBlur")
    },
    checkbox: {
      asValue: "checked",
      asChange: ["onSelect"],
      defaultValue: false,
      type: Boolean
    }
  }
}

```

#### 1.2 Add \<FormProvider />


After, you need wrap root component with `<FormProvider />`, and pass components:

```tsx
import { FormProvider } form 'react-fluid-form'

function App() {
  return <FormProvider components={components}>
    // ...your code
  </FormProvider>
}

```


### 2. Create your form

#### 2.1 Call useForm hook 

Now, you need call useForm inside your component, that instantiate the form. 
With instance, you can get the result values, errors, validate programmatically, check validation, and more.


```typescript
import { useForm } form 'react-fluid-form'

function MyForm() {
  const form = useForm({
    initialValues: {

    } // optional
  })
}

```

#### 2.2 Validate the form

Optionally, pass the validator. React fluid form, by default, uses `yup` for validation, but you can create your custom validator, or use other libraries. There is no need to use react-fluid-form with validation, just you want.
\
\
Example code:

```typescript
import {useYupValidator, useForm} form 'react-fluid-form'
import * as yup form 'yup'

// Inside component:

// Using yup:
const schema = yup.object().shape({
  person: yup.object({
    name: yup.string().required()
  }).required()
})

const validator = useYupValidator(schema)
const form = useForm({ validator })



// Custom validator:
const validator = function(path, values) {
  // params example: 
  // path: "person.name"
  // values: {person: {name: ""}}

  const { person: {name} } = values

  // If path is undefined, react-fluid-form is validating entire form
  if(path) {
    // validating specific path of form
    if(path === "person.name" && name) { 
      return "Name of person is required"
    }
    return ""
  } 

  // validating entire form
  if(!name) {
    return {
      "person.name": "Name of person is required"
    }
  }
}

```


#### 2.3 Wrap your component with \<Form />

```tsx
import {useForm, Form, Field} form 'react-fluid-form'

function MyForm() {
  const form = useForm()
  
  return <Form
    form={form}
    validateOnBlur // to validate path on blur the field
  >
    // ...
  </Form>
}

```

#### 2.3 Wrap your field with \<Field />


```tsx
import {useForm, Form, Field} form 'react-fluid-form'
import {observer} form 'mobx-react'

function MyForm() {
  const form = useForm()
  
  return <Form
    form={form}
    validateOnBlur // to validate path on blur the field
  >
    <Field
      path={"person.name"}
      use={"textInput"}
    >
      <input placeholder={"Name"} />
    </Field>
  </Form>
}

// Important: for use form instance properties, wrap MyForm in observer (of mobx-react - https://github.com/mobxjs/mobx-react):
export default observer(MyForm)


```

> To show the error on screen, Field pass "error" prop forward. So, you can render in custom input component


### 3. Form instance

Form instance has some helper properties and methods:

| Prop/Method                      | Return type |             Description              |
| :------------------------------- | :---------: | :----------------------------------: |
| `form.isValid`                   |   boolean   |      Check if the form is valid      |
| `form.raw`                       |   object    |          Get values to save          |
| `form.errors`                    |   object    |            Errors object             |
| `form.validatePath(path)`        |    void     |        Validate path of form         |
| `form.setValues(values)`         |    void     |       Pass new values to form        |
| `form.setPathValue(path, value)` |    void     |     Set value for specific path      |
| `form.setPathError(path, error)` |    void     |     Set error for specific path      |
| `form.mergeValues(values)`       |    void     | Merge values with new values to form |

### Contributions

All contributions are welcome. Just make a PR.
