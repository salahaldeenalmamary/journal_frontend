import React, { memo } from "react";
import _ from "lodash";

const Select = ({
  name,
  label,
  options,
  optionValue = "name",
  errorMessage,
  ...rest
}) => {
  const renderValue = (option, value) => {
    return _.get(option, value);
  };
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select className="form-select" name={name} id={name} {...rest}>
        <option value="">select a {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {renderValue(option, optionValue)}
          </option>
        ))}
      </select>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default memo(Select);
