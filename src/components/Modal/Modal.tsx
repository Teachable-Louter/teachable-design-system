import React from "react";
import * as S from "./style";
import { Button } from "../Button";
import CloseIcon from "../../assets/icons/close_icon.svg";

interface ModalProps {
  title: string | string[];
  description: string | string[];
  onClose?: () => void;
  size?: "small" | "medium" | "large";
  isVisionButton?: boolean;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const Modal = ({
  title,
  description,
  onClose,
  size = "large",
  isVisionButton = true,
  cancelButtonLabel = "취소",
  confirmButtonLabel = "확인",
  onCancel,
  onConfirm,
}: ModalProps) => {
  const renderText = (text: string | string[]) => {
    const lines = Array.isArray(text) ? text : [text];
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Wrapper size={size} onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <img src={CloseIcon} alt="Close" />
        </S.CloseButton>
        <S.MainTextArea>
          <S.Title>{renderText(title)}</S.Title>
          <S.Description>{renderText(description)}</S.Description>
        </S.MainTextArea>
        {isVisionButton && (
          <S.ButtonArea>
            <S.ButtonWrapper>
              <Button
                size="medium"
                type="tertiary"
                label={cancelButtonLabel}
                width="78px"
                height="48px"
                onClick={handleCancel}
              />
              <Button
                size="medium"
                type="primary"
                label={confirmButtonLabel}
                width="78px"
                height="48px"
                onClick={handleConfirm}
              />
            </S.ButtonWrapper>
          </S.ButtonArea>
        )}
      </S.Wrapper>
    </S.Overlay>
  );
};

export default Modal;
