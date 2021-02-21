import { Field, Form, useForm } from "@fluidform/core";
import { useYupValidator } from "@fluidform/yup";
import { Observer } from "mobx-react";
import React from "react";
import * as yup from "yup";
import MyCheckbox from "./components/MyCheckbox";
import MyCombobox from "./components/MyCombobox";
import MyInput from "./components/MyInput";

const MyForm: React.FC = () => {
  const validator = useYupValidator(schema);
  const form = useForm({
    validator,
  });

  const save = React.useCallback(() => {
    console.log(form.raw); // print the output object
  }, [form]);

  return (
    <Form form={form} validateOnChange>
      <div>
        <h1>Person form</h1>
        <br />

        <Field path={"person.name"} use={"textInput"}>
          <MyInput name={"name"} placeholder={"Name"} />
        </Field>

        <br />

        <Field path={"person.email"} use={"textInput"}>
          <MyInput name={"email"} placeholder={"Email"} type={"email"} />
        </Field>

        <br />

        <Field path={"person.genre"} use={"combobox"}>
          <MyCombobox label={"Genre"} options={genreOptions} />
        </Field>

        <Field path={"acceptedTerms"} use={"checkbox"}>
          <MyCheckbox name={"genre"} label={"I accept the terms of use"} />
        </Field>

        <Observer>
          {() => (
            <button disabled={!form.isValid} onClick={save}>
              Save
            </button>
          )}
        </Observer>
      </div>
    </Form>
  );
};

const genreOptions = [
  {
    label: "Male",
    value: "M",
  },
  {
    label: "Female",
    value: "F",
  },
];

const schema = yup.object({
  person: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    genre: yup.string().oneOf(["M", "F"], "Incorrect genre").required(),
  }),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
});

// wrap component with mobx observer
export default MyForm;
