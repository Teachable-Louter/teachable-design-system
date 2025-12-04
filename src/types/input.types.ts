export interface InputProps {
  width?: string;
  height?: string;
  size?: "small" | "medium" | "large";
  label?: boolean;
  labelText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isPassword?: boolean;
}

export type InputSize = "small" | "medium" | "large";
