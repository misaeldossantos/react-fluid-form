import React from "react";
import {toJS} from 'mobx'

const MyInput: React.FC<any> = ({ error, ...props }) => {
  return (
    <div>
      <input {...props} />
      {!!error && (
        <>
          <br />
          <span style={{ color: "red" }}>{error}</span>
        </>
      )}
    </div>
  );
};

export default MyInput;
