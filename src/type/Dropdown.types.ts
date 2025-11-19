export interface DropdownProps {
	size?: "small" | "medium" | "large";
	onSelect?: (option: string) => void;
	options: string[];
	label?: string;
}