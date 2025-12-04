import React from "react";
import { typography } from "../../style";

export const getInputWrapperStyle = (
  size: "small" | "medium" | "large"
): React.CSSProperties => {
  let height = "48px";

  switch (size) {
    case "small":
      height = "41px";
      break;
    case "medium":
      height = "48px";
      break;
    case "large":
      height = "56px";
      break;
  }

  return {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "306px",
    height: height,
  };
};

export const labelStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  ...typography.label.small,
  color: "#333",
};

export const getInputStyle = (
  inputSize: "small" | "medium" | "large",
  disabled: boolean,
  isFocused: boolean,
  isPassword: boolean = false
): React.CSSProperties => {
  let padding = isPassword ? "0px 48px 0px 16px" : "0px 16px";
  let fontSize = typography.label.medium.fontSize;
  let lineHeight = typography.label.medium.lineHeight;
  let fontWeight = typography.label.medium.fontWeight;
  let height = "48px";
  let width = "306px";

  switch (inputSize) {
    case "small":
      fontSize = typography.label.small.fontSize;
      lineHeight = typography.label.small.lineHeight;
      fontWeight = typography.label.small.fontWeight;
      height = "40px";
      break;
    case "medium":
      fontSize = typography.label.medium.fontSize;
      lineHeight = typography.label.medium.lineHeight;
      fontWeight = typography.label.medium.fontWeight;
      height = "48px";
      break;
    case "large":
      fontSize = typography.label.large.fontSize;
      lineHeight = typography.label.large.lineHeight;
      fontWeight = typography.label.large.fontWeight;
      height = "56px";
      break;
  }

  return {
    width,
    height,
    minHeight: height,
    maxHeight: height,
    padding,
    fontSize,
    lineHeight,
    fontWeight,
    fontFamily: typography.fontFamily.primary,
    border: isFocused ? "1px solid #4a90e2" : "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    transition: "all 0.2s ease",
    boxShadow: isFocused ? "0 0 0 3px rgba(74, 144, 226, 0.1)" : "none",
    backgroundColor: disabled ? "#f5f5f5" : "#fff",
    cursor: disabled ? "not-allowed" : "text",
    color: "#333",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
  };
};

export const getInputContainerStyle = (): React.CSSProperties => {
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
  };
};

export const getIconButtonStyle = (disabled: boolean): React.CSSProperties => {
  return {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    transition: "opacity 0.2s ease",
  };
};
