export interface DropdownProps {
	width?: string;
	height?: string;
	onSelect?: () => void;
	options: string[];
	label?: string;
}