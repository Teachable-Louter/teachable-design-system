import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../style/theme/colors';
import { typography } from '../../style/theme/typography';

export interface DropdownProps {
	width?: string;
	height?: string;
	onSelect?: () => void;
	options: string[];
	label?: string;
}