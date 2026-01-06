import React from "react";
import * as S from "./style";
import { Button } from '../Button';
import CloseIcon from '../../assets/icons/close_icon.svg'; // 실제 경로로 수정

interface ModalProps {
  title: string | string[];
  description: string | string[];
  onClose?: () => void;
  size?: "small" | "medium" | "large";
  isVisionButton?: boolean;
}

const Modal = ({ 
  title, 
  description, 
  onClose, 
  size = "large",
  isVisionButton = true 
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
              <Button size="medium" type="tertiary" label="확인" width="78px" height="48px" />
              <Button size="medium" type="primary" label="확인" width="78px" height="48px" />
            </S.ButtonWrapper>
          </S.ButtonArea>
        )}
      </S.Wrapper>
    </S.Overlay>
  );
};

export default Modal;