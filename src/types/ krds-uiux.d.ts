declare module 'krds-uiux' {
	import React from 'react';
	
	export interface ButtonProps {
		variant?: 'primary' | 'secondary';
		style?: React.CSSProperties;
		onClick?: () => void;
		children?: React.ReactNode;
	}
	
	export const Button: React.FC<ButtonProps>;
}