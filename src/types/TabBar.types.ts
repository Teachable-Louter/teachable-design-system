export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TabBarProps {
  title?: string;
  items: TabItem[];
  defaultSelectedId?: string;
  selected?: string;
  onChange?: (id: string) => void;
}
