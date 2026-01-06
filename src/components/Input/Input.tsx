import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  InputWrapper,
  Label,
  InputContainer,
  StyledInput,
  IconButton,
  WarningText,
} from "./style";
import { InputProps } from "../../types/input.types";

export const Input = ({
  id,
  width,
  height,
  size = "medium",
  label = false,
  labelText = "",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  isPassword = false,
  isWarning = false,
  warningText = "",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";

  return (
    <InputWrapper width={width}>
      {label && labelText && <Label htmlFor={id}>{labelText}</Label>}
      <InputContainer>
        <StyledInput
          id={id}
          type={inputType}
          inputSize={size}
          width={width}
          height={height}
          disabled={disabled}
          isPassword={isPassword}
          isWarning={isWarning}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <IconButton
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </IconButton>
        )}
      </InputContainer>
      {isWarning && warningText && <WarningText>{warningText}</WarningText>}
    </InputWrapper>
  );
};
