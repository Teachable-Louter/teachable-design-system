import React from "react";
import {DropdownProps} from "../../types/Dropdown.types";
import {StyledBox, StyledDropDown, StyledText, StyledLabel, StyledIcon, StyledOptions, StyledOption} from "./style";
import arrowDownIcon from '../../assets/icons/arrow-down.png';

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
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);
	
	const handleSelect = (option: string) => {
		setSelected(option);
		onSelect?.(option);
		setOpen(false);
	};
	return (
		<div ref={ref} style={{position: 'relative'}}>
			<StyledLabel>{label}</StyledLabel>
			<StyledDropDown onClick={() => setOpen((prev) => !prev)}
				size={size}
				isOpen={open}
				>
				<StyledBox>
					<StyledText
						size={size}
						isOpen={open}
					>{selected ?? placeholder}</StyledText>
					<StyledIcon size={size}>
						<img src={arrowDownIcon} alt="dropdown icon" style={{width:'100%', height:'100%'}}/>
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