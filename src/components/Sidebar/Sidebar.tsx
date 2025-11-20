import React from "react";
import {
	StyledButtonArea,
	StyledDescription,
	StyledDisclosure,
	StyledOpenContents, StyledOpenContentsText,
	StyledSidebar,
	StyledTitle,
	StyledIcon
} from './style'
import Button from "../Button/Button";
import {SidebarProps} from "../../type/Sidebar.types";
import icon from "../../assets/icons/icon_size.png"

export default function Sidebar({description}: SidebarProps) {
	
	const [openSections, setOpenSections] = React.useState<boolean[]>(
		Array(description.length).fill(true) // 기본적으로 모두 열려있게
	);
	
	const toggleSection = (index: number) => {
		const newState = [...openSections];
		newState[index] = !newState[index]; // 현재 인덱스 toggle
		setOpenSections(newState);
	};
	
	return(
		<StyledSidebar>
			<StyledDescription>
				{description.map((item, index) => (
					<StyledDisclosure>
						<StyledTitle onClick={() => toggleSection(index)} style={{ cursor: 'pointer' }}>
							<StyledIcon src={icon} alt="icon" isOpen={openSections[index]} />
							{item[0]}
						</StyledTitle>
						
						{openSections[index] && (
							<StyledOpenContents>
								{item[1].map((option, i) => (
									<StyledOpenContentsText key={i}>{option}</StyledOpenContentsText>
								))}
							</StyledOpenContents>
						)}
					</StyledDisclosure>
				))}
			</StyledDescription>
			<StyledButtonArea>
				<Button size='small' type='secondary' label='이전으로' width='100px' height='40px' ></Button>
				<Button size='small' type='primary' label='다음으로' width='100px' height='40px' ></Button>
			</StyledButtonArea>
		</StyledSidebar>
	)
}
