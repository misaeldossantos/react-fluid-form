import React from "react";
import FormSettingsContext from "./FormSettingsContext";
import { Components } from "./types";

const FormProvider: React.FC<{
  components: Components;
}> = ({ components, children }) => {
  return (
    <FormSettingsContext.Provider
      value={{
        components,
      }}
    >
      {children}
    </FormSettingsContext.Provider>
  );
};

export default FormProvider;
