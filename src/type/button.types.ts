export interface ButtonProps {
    width?: string;
    height?: string;
    type?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

export type ButtonType = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';