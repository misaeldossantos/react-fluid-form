import React from "react";

const MyCombobox: React.FC<any> = ({ options, name, value, label, setValue, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <select name={name} onChange={(ev) => setValue(ev.target.value)} value={value}>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {!!error && (
        <>
          <br />
          <span style={{ color: "red" }}>{error}</span>
        </>
      )}
    </div>
  );
};

export default MyCombobox;
