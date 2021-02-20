export type Components = {
  form: {
    [key: string]: {
      type: Function;
      asValue: string;
      asChange: [string, Function?];
      defaultValue: boolean;
    };
  };
};
