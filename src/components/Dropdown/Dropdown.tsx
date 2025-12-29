import React from "react";
import {DropdownProps} from "../../types/Dropdown.types";
import {StyledBox, StyledDropDown, StyledText, StyledLabel, StyledIcon, StyledOptions, StyledOption} from "./style";
import { arrowDownIconBase64 } from '../../assets/icons';

export function Dropdown({size, options, onSelect, label, placeholder, width}: DropdownProps) {
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
			{label && <StyledLabel>{label}</StyledLabel>}
			<StyledDropDown onClick={() => setOpen((prev) => !prev)}
				size={size}
				width={width}
				isOpen={open}
				>
				<StyledBox>
					<StyledText
						size={size}
						isOpen={open}
					>{selected ?? placeholder}</StyledText>
					<StyledIcon size={size}>
						<img src={arrowDownIconBase64} alt="dropdown icon" style={{width:'100%', height:'100%'}}/>
					</StyledIcon>
				</StyledBox>
			</StyledDropDown>
			{open && (
				<StyledOptions size={size}>
					{options?.map((option) => (
						<StyledOption key={option} onClick={() => handleSelect(option)} size={size} isSelected={option === selected}>
							{option}
						</StyledOption>
					))}
				</StyledOptions>
				)}
		</div>
	)
}