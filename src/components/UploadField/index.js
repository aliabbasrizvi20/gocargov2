import { useState } from "react";
import "./index.css";
function UploadField({
  type,
  placeholder,
  disabled,
  onChange,
  error,
  pattern,
  className,
  multiple,
  accept,
}) {
  const [internalError, setInternalError] = useState("");

  return (
    <div className="input-field-section">
      <div className="input-field-wrap">
        <input
          type={type}
          placeholder={placeholder}
          multiple={multiple}
          accept={accept}
          className={`form-control  ${className}`}
          onChange={onChange}
          disabled={disabled}
        ></input>
      </div>
      {(error || internalError) && (
        <div className="input-error">{error || internalError}</div>
      )}
    </div>
  );
}

export default UploadField;
