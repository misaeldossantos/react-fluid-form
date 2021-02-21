import React from "react";
import { FormProvider } from "@fluidform/core";
import MyForm from "./MyForm";

const App: React.FC = () => {
  return (
    <FormProvider components={components}>
      <MyForm />
    </FormProvider>
  );
};

const components = {
  textInput: {
    type: String,
    asChange: ["onChange", (ev) => ev.target.value],
    defaultValue: "",
    asValue: "value",
  },
  checkbox: {
    type: Boolean,
    asValue: "checked",
    asChange: ["setValue"],
    defaultValue: false,
  },
  combobox: {
    type: String,
    asChange: ["setValue"],
    defaultValue: false,
  },
};

export default App;
