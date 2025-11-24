export interface CheckBoxProps {
  size: "medium" | "large";
  select: "off" | "on" | "indeterminate";
  state: "default" | "disabled";
  onClick?: () => void;
}
