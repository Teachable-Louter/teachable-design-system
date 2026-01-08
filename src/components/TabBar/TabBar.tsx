import { useState } from "react";
import React from "react";
import * as S from "./style";
import { TabBarProps } from "../../types/TabBar.types";

export const TabBar = ({
  title,
  items,
  defaultSelectedId,
  selected,
  onChange,
}: TabBarProps) => {
  const [selectedId, setSelectedId] = useState(
    defaultSelectedId || items[0]?.id
  );

  // selected prop이 제공되면 controlled component로 동작
  const currentSelectedId = selected !== undefined ? selected : selectedId;

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;

    // selected prop이 제공되지 않았을 때만 내부 state 변경
    if (selected === undefined) {
      setSelectedId(id);
    }

    // onChange는 항상 호출하여 외부에 알림
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
      <S.Tablist>
        {items.map((item) => (
          <S.TabItem
            key={item.id}
            isSelected={currentSelectedId === item.id}
            isDisabled={item.disabled}
            onClick={() => handleTabClick(item.id, item.disabled)}
          >
            {item.label}
          </S.TabItem>
        ))}
      </S.Tablist>
    </S.Wrapper>
  );
};
