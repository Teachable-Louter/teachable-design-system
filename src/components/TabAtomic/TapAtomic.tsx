import React from "react";
import { TabAtomicProps } from "../../types/TabAtomic.types";
import { StyledTabContainer, StyledTab } from "./style";

export function TabAtomic({ tabs, defaultSelected, onChange }: TabAtomicProps) {
	const [selected, setSelected] = React.useState<string>(
		defaultSelected || tabs[0] || ""
	);

	const handleTabClick = (tab: string) => {
		setSelected(tab);
		onChange?.(tab);
	};

	return (
		<StyledTabContainer>
			{tabs.map((tab) => (
				<StyledTab
					key={tab}
					isSelected={selected === tab}
					onClick={() => handleTabClick(tab)}
				>
					{tab}
				</StyledTab>
			))}
		</StyledTabContainer>
	);
}

