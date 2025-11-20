import React from "react";
import {DropdownProps} from "../../type/Dropdown.types";
import {Box, StyledDropDown, Text} from "./style";
// import icon from '../../assets/icon/icon-dropdown.svg';

export function Dropdown({size, options, onSelect, label, placeholder}: DropdownProps) {
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<string | null>(null);
	const ref = React.useRef<HTMLDivElement>(null);
	
	React.useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	
	const handleSelect = (option: string) => {
		setSelected(option);
		onSelect?.(option);
		setOpen(false);
	};
	
	
	return (
		<div style={{position: 'relative'}}>
			<p>{label}</p>
			<StyledDropDown onClick={() => setOpen((prev) => !prev)}
				size={size}
				>
				<Box>
					<Text
						size={size}
					>{selected ?? placeholder}</Text>
					{/*<img src={icon} alt="icon" />*/}
					<p>i</p>
				</Box>
			</StyledDropDown>
			{open && (
				<ul style={{border:'1px solid'}}>
					{options?.map((option) => (
						<li key={option} onClick={() => handleSelect(option)}>
							{option}
						</li>
					))}
				</ul>
				)}
		</div>
	)
}