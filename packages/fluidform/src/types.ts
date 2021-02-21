export type Components = {
  [key: string]: {
    type?: Function;
    asValue?: string;
    asChange?: any[];
    asOnBlur?: any[];
    defaultValue?: any;
  };
};
