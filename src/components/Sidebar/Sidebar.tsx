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
import { Button } from "../Button/Button";
import {SidebarProps} from "../../types/Sidebar.types";
import { arrowUpIconBase64 } from "../../assets/icons"

export function Sidebar({buttonStyle, description, title, onPrev, onNext}: SidebarProps) {
	
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
							<StyledIcon src={arrowUpIconBase64} alt="icon" isOpen={openSections[index]} />
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
			{
				buttonStyle === 'start' ? (
					<StartButton onNext={onNext} />
				) : buttonStyle === 'middle' ? (
					<MiddleButton onNext={onNext} onPrev={onPrev} />
				) : buttonStyle === 'end' ? (
					<EndButton onPrev={onPrev} />
				) : (
					<MiddleButton onNext={onNext} onPrev={onPrev} />
				)
			}
		</StyledSidebar>
	)
}

function StartButton({ onNext }: { onNext?: () => void }) {
	return (
		<StyledButtonArea>
			<Button
				size="small"
				type="primary"
				label="다음으로"
				width="240px"
				height="40px"
				onClick={onNext}
			/>
		</StyledButtonArea>
	)
}

function MiddleButton({
						  onNext,
						  onPrev,
					  }: {
	onNext?: () => void
	onPrev?: () => void
}) {
	return (
		<StyledButtonArea>
			<Button
				size="small"
				type="secondary"
				label="이전으로"
				width="115px"
				height="40px"
				onClick={onPrev}
			/>
			<Button
				size="small"
				type="primary"
				label="다음으로"
				width="115px"
				height="40px"
				onClick={onNext}
			/>
		</StyledButtonArea>
	)
}

function EndButton({ onPrev }: { onPrev?: () => void }) {
	return (
		<StyledButtonArea>
			<Button
				size="small"
				type="primary"
				label="이전으로"
				width="240px"
				height="40px"
				onClick={onPrev}
			/>
		</StyledButtonArea>
	)
}