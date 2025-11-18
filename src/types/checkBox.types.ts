export interface CheckBoxProps {
  size: "medium" | "large";
  select: "off" | "on" | "interminate";
  state: "default" | "disabled";
  onClick?: () => void;
}
