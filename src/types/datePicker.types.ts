export interface DatePickerProps {
    /** 선택된 시작 날짜 */
    startDate?: Date | null;
    /** 선택된 종료 날짜 */
    endDate?: Date | null;
    /** 단일 날짜 선택 모드 */
    selectedDate?: Date | null;
    /** 범위 선택 모드 여부 */
    isRangeMode?: boolean;
    /** 날짜 선택 시 콜백 (단일 모드) */
    onDateSelect?: (date: Date) => void;
    /** 날짜 범위 선택 시 콜백 (범위 모드) */
    onRangeSelect?: (startDate: Date | null, endDate: Date | null) => void;
    /** 선택 버튼 클릭 시 콜백 */
    onConfirm?: () => void;
    /** 취소 버튼 클릭 시 콜백 */
    onCancel?: () => void;
    /** 최소 선택 가능 날짜 */
    minDate?: Date;
    /** 최대 선택 가능 날짜 */
    maxDate?: Date;
    /** 요일 표시 언어 */
    locale?: 'ko' | 'en';
    /** 컴포넌트 너비 */
    width?: string;
}

export type DatePickerLocale = 'ko' | 'en';
