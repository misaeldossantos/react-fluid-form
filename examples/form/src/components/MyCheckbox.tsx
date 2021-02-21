import React from "react";

const MyCheckbox: React.FC<any> = ({ setValue, error, value, label, ...props }) => {
  return (
    <div>
      <input
        type="checkbox"
        onChange={(ev) => {
          if (setValue) setValue(ev.target.checked);
        }}
        value={value? "on": "off"}
        {...props}
      />
      <span>{label}</span>
      {!!error && (
        <>
          <br />
          <span style={{ color: "red" }}>{error}</span>
        </>
      )}
    </div>
  );
};

export default MyCheckbox;
