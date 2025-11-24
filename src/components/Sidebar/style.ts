import styled from '@emotion/styled';
// import { css } from '@emotion/react';
import { colors } from '../../style';
import { typography } from '../../style';

interface TitleProps {
	isOpen: boolean;
	
}

export const StyledIcon = styled.img<TitleProps>`
    width: 20px;
	height: 20px;
    transition: transform 0.3s ease;
    transform: rotate(${props => (props.isOpen ? '0deg' : '90deg')});
`

export const StyledSidebar = styled.div`
    display: flex;
    width: 240px;
	height: 100vh;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
	
	background: ${colors.background.white};
`;

export const StyledDescription = styled.div`
	width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    flex: 1 0 0;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: ${colors.surface["gray-subtler"]};
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${colors.text.subtle};
        border-radius: 4px;
    }
	
    ::-webkit-scrollbar-thumb:hover {
        background-color: ${colors.action["secondary-active"]};
    }
	
    ::-webkit-scrollbar-thumb:active {
        background-color: ${colors.action["primary-active"]};
    }
`

export const StyledButtonArea = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: stretch;
	
`

export const StyledDisclosure = styled.div`
	display: flex;
	gap: 4px;
    flex-direction: column;
	
`
export const StyledTitle = styled.div`
    display: flex;
    width: 147px;
    align-items: center;
    gap: 4px;
	height: 26px;
    user-select:none
`
export const StyledOpenContents = styled.div`
    display: flex;
    padding:  12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
	max-width: 186px;
	
	border-radius: 12px;
	background: ${colors.surface["gray-subtler"]};
`
export const StyledOpenContentsText = styled.p`
    align-self: stretch;
	
    color: ${colors.text.subtle};

    /* body/xsmall */
    font-family: ${typography.fontFamily.primary};
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 19.5px */
    letter-spacing: 0;
    margin: 0;
`