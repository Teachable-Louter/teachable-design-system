import { useState } from "react";
import React from "react";
import * as S from "./style";

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TabBarProps {
  title?: string;
  items: TabItem[];
  defaultSelectedId?: string;
  onChange?: (id: string) => void;
}

export const TabBar = ({ title, items, defaultSelectedId, onChange }: TabBarProps) => {
  const [selectedId, setSelectedId] = useState(
    defaultSelectedId || items[0]?.id
  );

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setSelectedId(id);
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
            isSelected={selectedId === item.id}
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
