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
import {SidebarProps} from "../../types/Sidebar.types";
import icon from "../../assets/icons/icon_size.png"

export default function Sidebar({buttonStyle, description, title}: SidebarProps) {
	
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
				{title.map((item, index) => (
					<StyledDisclosure>
						<StyledTitle onClick={() => toggleSection(index)} style={{ cursor: 'pointer' }}>
							<StyledIcon src={icon} alt="icon" isOpen={openSections[index]} />
							{item}
						</StyledTitle>
						
						{openSections[index] && (
							<StyledOpenContents>
								{description[index].map((option, i) => (
									<StyledOpenContentsText key={i}>{option}</StyledOpenContentsText>
								))}
							</StyledOpenContents>
						)}
					</StyledDisclosure>
				))}
			</StyledDescription>
			{buttonStyle === 'two' ? <TwoButton /> : <OneButton />}
		</StyledSidebar>
	)
}

function OneButton() {
	return (
		<StyledButtonArea>
			<Button size='small' type='primary' label='다음으로' width='240px' height='40px' ></Button>
		</StyledButtonArea>
	)
}

function TwoButton() {
	return (
		<StyledButtonArea>
			<Button size='small' type='secondary' label='이전으로' width='115px' height='40px' ></Button>
			<Button size='small' type='primary' label='다음으로' width='115px' height='40px' ></Button>
		</StyledButtonArea>
	)
}