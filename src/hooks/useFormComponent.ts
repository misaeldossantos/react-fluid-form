import { useContext, useMemo } from "react";
import FormSettingsContext from "../FormSettingsContext";

export default function (name: string) {
  const settings = useContext(FormSettingsContext);
  return useMemo(() => {
    return settings.components[name] || {};
  }, [settings, name]);
}
