import { useField } from "formik";
import React from "react";

const TextField = ({ className, error, span, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <span>{span}</span>
      <input
        className={` ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        autoComplete="off"
        placeholder={span}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      <p className="errorMessage">{error}</p>
    </>
  );
};

export default TextField;
