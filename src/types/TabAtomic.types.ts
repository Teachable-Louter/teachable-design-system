export interface TabAtomicProps {
	tabs: string[];
	defaultSelected?: string;
	onChange?: (selectedTab: string) => void;
	gap?: string;
}

