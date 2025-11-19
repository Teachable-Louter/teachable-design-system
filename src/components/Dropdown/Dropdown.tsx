import {DropdownProps} from "../../type/Dropdown.types";
import {useState, useRef, useEffect} from "react";


export function Dropdown({width, height, options, onSelect, label}: DropdownProps) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
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
			<label>{label}</label>
			<button onClick={() => setOpen((prev) => !prev)}>
				{selected ?? "선택해주세요"}
			</button>
			{open && (
				<ul>
					{options.map((option) => (
						<li key={option} onClick={() => handleSelect(option)}>
							{option}
						</li>
					))}
				</ul>
				)}
		</div>
	)
}