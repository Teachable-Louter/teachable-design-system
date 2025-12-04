import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  getInputWrapperStyle,
  labelStyle,
  getInputStyle,
  getInputContainerStyle,
  getIconButtonStyle,
} from "./style";
import { InputProps } from "../../types/input.types";

export const Input = ({
  size = "medium",
  label = false,
  labelText = "",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  isPassword = false,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";

  return (
    <div style={getInputWrapperStyle(size)}>
      {label && labelText && <label style={labelStyle}>{labelText}</label>}
      <div style={getInputContainerStyle()}>
        <input
          type={inputType}
          style={getInputStyle(size, disabled, isFocused, isPassword)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <button
            type="button"
            style={getIconButtonStyle(disabled)}
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            aria-label={showPassword ? "Show password" : "Hide password"}
          >
            {showPassword ? (
              <Eye size={20} color="#666" />
            ) : (
              <EyeOff size={20} color="#666" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
