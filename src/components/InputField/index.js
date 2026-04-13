import { useState } from "react";
import "./InputField.css";
function InputField({
  type,
  placeholder,
  disabled,
  onChange,
  error,
  pattern,
  className,
}) {
  const [internalError, setInternalError] = useState("");

  return (
    <div className="input-field-section">
      <div className="input-field-wrap">
        <input
          type={type}
          placeholder={placeholder}
          className={`form-control  ${className}`}
          onChange={onChange}
          disabled={disabled}
          required
        ></input>
      </div>
      {(error || internalError) && (
        <div className="input-error">{error || internalError}</div>
      )}
    </div>
  );
}

export default InputField;
