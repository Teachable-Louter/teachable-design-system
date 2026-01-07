export interface SidebarProps {
	buttonStyle?: 'start' | 'middle' | 'end';
	title: string[],
	description: string[] []
	onNext?: () => void
	onPrev?: () => void
	disableNext?: boolean
	disablePrev?: boolean
}