import { Components } from "./types";
import { createContext } from "react";

export default createContext<{
  components: Components;
}>({ components: { form: {} } });
