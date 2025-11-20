import { useState } from "react";
import React from "react";
import * as S from "./style";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabBarProps {
  title?: string;
  items: TabItem[];
  defaultSelectedId?: string;
  onChange?: (id: string) => void;
}

const TabBar = ({ title, items, defaultSelectedId, onChange }: TabBarProps) => {
  const [selectedId, setSelectedId] = useState(
    defaultSelectedId || items[0]?.id
  );

  const handleTabClick = (id: string) => {
    setSelectedId(id);
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
      {items.map((item) => (
        <S.TabItem
          key={item.id}
          isSelected={selectedId === item.id}
          onClick={() => handleTabClick(item.id)}
        >
          {item.label}
        </S.TabItem>
      ))}
    </S.Wrapper>
  );
};

export default TabBar;
