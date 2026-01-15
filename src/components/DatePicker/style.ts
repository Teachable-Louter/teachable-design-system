import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../style/theme/colors';
import { typography } from '../../style/theme/typography';

interface DatePickerContainerProps {
    width?: string;
}

export const DatePickerContainer = styled.div<DatePickerContainerProps>`
    display: flex;
    flex-direction: column;
    background-color: ${colors.surface.white};
    border-radius: 16px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    padding: 24px;
    width: ${props => props.width || '380px'};
    box-sizing: border-box;
    font-family: ${typography.fontFamily.primary};
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

export const NavigationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid ${colors.border['gray-light']};
    border-radius: 50%;
    background-color: ${colors.surface.white};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${colors.surface['gray-subtler']};
    }

    &:active {
        background-color: ${colors.surface['gray-subtle']};
    }
`;

export const MonthYearSelector = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: ${typography.heading.small.fontSize};
    font-weight: ${typography.heading.small.fontWeight};
    line-height: ${typography.heading.small.lineHeight};
    color: ${colors.text.basic};
    font-family: ${typography.fontFamily.primary};

    &:hover {
        color: ${colors.text.primary};
    }
`;

export const WeekdayRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 8px;
`;

export const WeekdayCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: ${typography.body.small.fontSize};
    font-weight: ${typography.body.smallBold.fontWeight};
    color: ${colors.text.subtle};
    font-family: ${typography.fontFamily.primary};
`;

export const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px 0;
`;

interface DayCellProps {
    isCurrentMonth?: boolean;
    isSelected?: boolean;
    isToday?: boolean;
    isInRange?: boolean;
    isRangeStart?: boolean;
    isRangeEnd?: boolean;
    isDisabled?: boolean;
}

export const DayCell = styled.button<DayCellProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
    font-family: ${typography.fontFamily.primary};
    transition: all 0.15s ease-in-out;
    z-index: 1;

    /* 기본 텍스트 색상 */
    color: ${props => {
        if (props.isDisabled) return colors.text.disabled;
        if (!props.isCurrentMonth) return colors.text.disabled;
        if (props.isSelected || props.isRangeStart || props.isRangeEnd) return colors.text['inverse-static'];
        return colors.text.basic;
    }};

    /* 범위 배경 */
    ${props => props.isInRange && !props.isRangeStart && !props.isRangeEnd && css`
        background-color: ${colors.surface['primary-subtler']};
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -1px;
            right: -1px;
            bottom: 0;
            background-color: ${colors.surface['primary-subtler']};
            z-index: -1;
        }
    `}

    /* 범위 시작점 */
    ${props => props.isRangeStart && css`
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            right: -1px;
            bottom: 0;
            background-color: ${colors.surface['primary-subtler']};
            z-index: -1;
        }
        
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background-color: #1E3A5F;
            border-radius: 50%;
            z-index: -1;
        }
    `}

    /* 범위 끝점 */
    ${props => props.isRangeEnd && css`
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -1px;
            right: 50%;
            bottom: 0;
            background-color: ${colors.surface['primary-subtler']};
            z-index: -1;
        }
        
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background-color: #1E3A5F;
            border-radius: 50%;
            z-index: -1;
        }
    `}

    /* 시작과 끝이 같은 경우 */
    ${props => props.isRangeStart && props.isRangeEnd && css`
        &::before {
            display: none;
        }
    `}

    /* 단일 선택 */
    ${props => props.isSelected && !props.isRangeStart && !props.isRangeEnd && css`
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background-color: #1E3A5F;
            border-radius: 50%;
            z-index: -1;
        }
    `}

    /* 오늘 날짜 표시 */
    ${props => props.isToday && !props.isSelected && !props.isRangeStart && !props.isRangeEnd && css`
        font-weight: ${typography.body.mediumBold.fontWeight};
        color: ${colors.text.primary};
    `}

    /* 호버 효과 */
    &:hover:not(:disabled) {
        ${props => !props.isSelected && !props.isRangeStart && !props.isRangeEnd && css`
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                background-color: ${colors.surface['gray-subtler']};
                border-radius: 50%;
                z-index: -1;
            }
        `}
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${colors.divider['gray-light']};
`;

export const TodayButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
    color: ${colors.text.subtle};
    font-family: ${typography.fontFamily.primary};
    padding: 8px 12px;

    &:hover {
        color: ${colors.text.basic};
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

export const CancelButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 24px;
    border: 1px solid ${colors.border['gray-light']};
    border-radius: 8px;
    background-color: ${colors.surface.white};
    cursor: pointer;
    font-size: ${typography.label.medium.fontSize};
    font-weight: ${typography.label.medium.fontWeight};
    color: ${colors.text.basic};
    font-family: ${typography.fontFamily.primary};
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${colors.surface['gray-subtler']};
    }

    &:active {
        background-color: ${colors.surface['gray-subtle']};
    }
`;

export const ConfirmButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    background-color: ${colors.button?.['primary-fill'] || '#256EF4'};
    cursor: pointer;
    font-size: ${typography.label.medium.fontSize};
    font-weight: ${typography.label.medium.fontWeight};
    color: ${colors.text['inverse-static']};
    font-family: ${typography.fontFamily.primary};
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${colors.button?.['primary-fill-hover'] || '#0B50D0'};
    }

    &:active {
        background-color: ${colors.button?.['tertiary-fill'] || '#063A74'};
    }
`;

// 아이콘
export const ChevronIcon = styled.span<{ direction: 'left' | 'right' }>`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${colors.text.subtle};
    border-bottom: 2px solid ${colors.text.subtle};
    transform: ${props => props.direction === 'left' ? 'rotate(135deg)' : 'rotate(-45deg)'};
`;

export const DropdownIcon = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${colors.text.basic};
    border-bottom: 2px solid ${colors.text.basic};
    transform: rotate(45deg);
    margin-left: 4px;
`;
