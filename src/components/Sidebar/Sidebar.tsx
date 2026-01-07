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

export function Sidebar({buttonStyle, description, title, onPrev, onNext, disablePrev, disableNext}: SidebarProps) {
	
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
					<StartButton
						onNext={onNext}
						disableNext={disableNext}
					/>
				) : buttonStyle === 'middle' ? (
					<MiddleButton
						onNext={onNext}
						onPrev={onPrev}
						disableNext={disableNext}
						disablePrev={disablePrev}
					/>
				) : buttonStyle === 'end' ? (
					<EndButton
						onPrev={onPrev}
						disablePrev={disablePrev}
					/>
				) : (
					<MiddleButton
						onNext={onNext}
						onPrev={onPrev}
						disableNext={disableNext}
						disablePrev={disablePrev}
					/>
				)
			}
		</StyledSidebar>
	)
}

function StartButton({
						 onNext,
						 disableNext,
					 }: {
	onNext?: () => void
	disableNext?: boolean
}) {
	return (
		<StyledButtonArea>
			<Button
				size="small"
				type="primary"
				label="다음으로"
				width="240px"
				height="40px"
				disabled={disableNext}
				onClick={onNext}
			/>
		</StyledButtonArea>
	)
}

function MiddleButton({
						  onNext,
						  onPrev,
						  disableNext,
						  disablePrev,
					  }: {
	onNext?: () => void
	onPrev?: () => void
	disableNext?: boolean
	disablePrev?: boolean
}) {
	return (
		<StyledButtonArea>
			<Button
				size="small"
				type="secondary"
				label="이전으로"
				width="115px"
				height="40px"
				disabled={disablePrev}
				onClick={onPrev}
			/>
			<Button
				size="small"
				type="primary"
				label="다음으로"
				width="115px"
				height="40px"
				disabled={disableNext}
				onClick={onNext}
			/>
		</StyledButtonArea>
	)
}

function EndButton({ onPrev, disablePrev }: {
	onPrev?: () => void
	disablePrev?: boolean
}) {
	return (
		<StyledButtonArea>
			<Button
				size="small"
				type="primary"
				label="이전으로"
				width="240px"
				height="40px"
				disabled={disablePrev}
				onClick={onPrev}
			/>
		</StyledButtonArea>
	)
}