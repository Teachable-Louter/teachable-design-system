import React, { useState, useMemo, useCallback } from "react";
import { DatePickerProps } from "../../types/datePicker.types";
import {
  DatePickerContainer,
  Header,
  NavigationButton,
  MonthYearSelector,
  WeekdayRow,
  WeekdayCell,
  DaysGrid,
  DayCell,
  Footer,
  TodayButton,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  ChevronIcon,
  DropdownIcon,
} from "./style";

const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];
const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS_KO = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const DatePicker = ({
  startDate = null,
  endDate = null,
  selectedDate = null,
  isRangeMode = true,
  onDateSelect,
  onRangeSelect,
  onConfirm,
  onCancel,
  minDate,
  maxDate,
  locale = "ko",
  width,
}: DatePickerProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || startDate || today
  );
  const [internalStartDate, setInternalStartDate] = useState<Date | null>(
    startDate
  );
  const [internalEndDate, setInternalEndDate] = useState<Date | null>(endDate);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    selectedDate
  );

  const weekdays = locale === "ko" ? WEEKDAYS_KO : WEEKDAYS_EN;

  // 현재 월의 첫 번째 날과 마지막 날
  const firstDayOfMonth = useMemo(() => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  }, [currentMonth]);

  const lastDayOfMonth = useMemo(() => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  }, [currentMonth]);

  // 달력에 표시할 날짜들 생성
  const calendarDays = useMemo(() => {
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // 이전 달의 날짜들
    const firstDayWeekday = firstDayOfMonth.getDay();
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const date = new Date(firstDayOfMonth);
      date.setDate(date.getDate() - i - 1);
      days.push({ date, isCurrentMonth: false });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      days.push({ date, isCurrentMonth: true });
    }

    // 다음 달의 날짜들 (6주 채우기)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDayOfMonth);
      date.setDate(lastDayOfMonth.getDate() + i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  }, [currentMonth, firstDayOfMonth, lastDayOfMonth]);

  // 날짜 비교 유틸리티
  const isSameDay = useCallback((date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);

  const isInRange = useCallback(
    (date: Date) => {
      if (!internalStartDate || !internalEndDate) return false;
      return date > internalStartDate && date < internalEndDate;
    },
    [internalStartDate, internalEndDate]
  );

  const isDateDisabled = useCallback(
    (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    },
    [minDate, maxDate]
  );

  // 이전/다음 달 이동
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // 날짜 클릭 처리
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (isRangeMode) {
      if (!internalStartDate || (internalStartDate && internalEndDate)) {
        // 새로운 범위 시작
        setInternalStartDate(date);
        setInternalEndDate(null);
      } else if (internalStartDate && !internalEndDate) {
        // 범위 끝 선택
        if (date < internalStartDate) {
          setInternalEndDate(internalStartDate);
          setInternalStartDate(date);
        } else {
          setInternalEndDate(date);
        }
      }
      onRangeSelect?.(internalStartDate, internalEndDate);
    } else {
      setInternalSelectedDate(date);
      onDateSelect?.(date);
    }
  };

  // 오늘 버튼 클릭
  const handleTodayClick = () => {
    const today = new Date();
    setCurrentMonth(today);
    if (!isRangeMode) {
      setInternalSelectedDate(today);
      onDateSelect?.(today);
    }
  };

  // 확인 버튼 클릭
  const handleConfirm = () => {
    if (isRangeMode) {
      onRangeSelect?.(internalStartDate, internalEndDate);
    } else {
      if (internalSelectedDate) {
        onDateSelect?.(internalSelectedDate);
      }
    }
    onConfirm?.();
  };

  // 월/년 표시 텍스트
  const monthYearText =
    locale === "ko"
      ? `${currentMonth.getFullYear()}년 ${MONTHS_KO[currentMonth.getMonth()]}`
      : `${currentMonth.toLocaleString("en-US", {
          month: "long",
        })} ${currentMonth.getFullYear()}`;

  return (
    <DatePickerContainer width={width}>
      <Header>
        <NavigationButton onClick={handlePrevMonth} aria-label="Previous month">
          <ChevronIcon direction="left" />
        </NavigationButton>
        <MonthYearSelector>
          {monthYearText}
          <DropdownIcon />
        </MonthYearSelector>
        <NavigationButton onClick={handleNextMonth} aria-label="Next month">
          <ChevronIcon direction="right" />
        </NavigationButton>
      </Header>

      <WeekdayRow>
        {weekdays.map((day, index) => (
          <WeekdayCell key={index}>{day}</WeekdayCell>
        ))}
      </WeekdayRow>

      <DaysGrid>
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const isSelectedDay = isSameDay(date, internalSelectedDate);
          const isRangeStart = isSameDay(date, internalStartDate);
          const isRangeEnd = isSameDay(date, internalEndDate);
          const isInRangeDay = isInRange(date);
          const isTodayDay = isSameDay(date, today);
          const isDisabled = isDateDisabled(date);

          return (
            <DayCell
              key={index}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelectedDay}
              isToday={isTodayDay}
              isInRange={isInRangeDay}
              isRangeStart={isRangeStart}
              isRangeEnd={isRangeEnd}
              isDisabled={isDisabled}
              onClick={() => handleDateClick(date)}
              disabled={isDisabled}
            >
              {date.getDate()}
            </DayCell>
          );
        })}
      </DaysGrid>

      <Footer>
        <TodayButton onClick={handleTodayClick}>
          {locale === "ko" ? "오늘" : "Today"}
        </TodayButton>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>
            {locale === "ko" ? "취소" : "Cancel"}
          </CancelButton>
          <ConfirmButton onClick={handleConfirm}>
            {locale === "ko" ? "선택" : "Select"}
          </ConfirmButton>
        </ButtonGroup>
      </Footer>
    </DatePickerContainer>
  );
};
