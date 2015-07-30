import React from 'react';

import {getClassName, chunk} from '../../utils';


class Calendar extends React.Component {
    render() {
        const className = getClassName(
            'react-ui-date-picker-calendar',
            this.props.calendarClassName
        );
        const subHeaderClassName = getClassName(
            'react-ui-date-picker-calendar-sub-header',
            this.props.calendarSubHeaderClassName
        );
        const bodyClassName = getClassName(
            'react-ui-date-picker-calendar-body',
            this.props.calendarBodyClassName
        );

        return (
            <table
            onMouseDown={this.props.onCalendarMouseDown}
            className={className}>
                {this.renderHeader()}

                <tr className={subHeaderClassName}>
                    {this.renderSubHeader()}
                </tr>

                <tr className={bodyClassName}>
                    {this.renderBody()}
                </tr>
            </table>
        );
    }

    renderHeader() {
        const date = this.props.selectedMonth;
        const month = this.props.monthNames[date.getMonth()];
        const title = `${month} ${date.getFullYear()}`;
        const headerClassName = getClassName(
            'react-ui-date-picker-calendar-header',
            this.props.calendarHeaderClassName
        );
        const previousClassName = getClassName(
            'react-ui-date-picker-calendar-header-previous',
            this.props.calendarHeaderPreviousClassName
        );
        const nextClassName = getClassName(
            'react-ui-date-picker-calendar-header-next',
            this.props.calendarHeaderNextClassName
        );

        return (
            <tr className={headerClassName}>
                <td onClick={this.props.onPreviousClick}>
                    <span className={previousClassName}></span>
                </td>

                <td colSpan={5}>{title}</td>

                <td onClick={this.props.onNextClick}>
                    <span className={nextClassName}></span>
                </td>
            </tr>
        );
    }

    renderSubHeader() {
        return this.props.dayNames.map((name) => name[0]).map((name, i) => (
            <td key={i}>
                {name}
            </td>
        ));
    }

    renderBody() {
        return chunk(this.getDates(), 7).map((week, i) => {
            const days = week.map((day, j) => {
                const disabled = this.isDateDisabled(day);
                const value = this.props.value;
                const today = this.props.today;
                const currentDayClass = (
                    this.datesEqual(day, today) ?
                    'react-ui-date-picker-calendar-current-day' :
                    null
                );
                const disabledDayClass = (
                    disabled ?
                    'react-ui-date-picker-calendar-disabled-day' :
                    null
                );
                const selectedDayClass = (
                    value && this.datesEqual(day, value) ?
                    'react-ui-date-picker-calendar-selected-day' :
                    null
                );
                const selectedMonthClass = (
                    this.props.selectedMonth.getMonth() === day.getMonth() ?
                    'react-ui-date-picker-calendar-selected-month' :
                    null
                );
                const dayClassName = getClassName(
                    'react-ui-date-picker-calendar-day',
                    currentDayClass,
                    selectedMonthClass,
                    disabledDayClass,
                    selectedDayClass
                );

                return (
                    <td
                    className={dayClassName}
                    disabled={disabled}
                    key={j}
                    onClick={this.props.onDateClick.bind(null, day, disabled)}>
                        {day.getDate()}
                    </td>
                );
            });

            return (
                <tr
                className="react-ui-date-picker-calendar-week"
                key={i}>
                    {days}
                </tr>
            );
        });
    }

    getDates() {
        const startDate = this.getStartDate();
        const dates = [startDate];

        while (dates.length < 42) {
            dates.push(this.addDays(dates[dates.length - 1], 1));
        }

        return dates;
    }

    datesEqual(a, b) {
        return (
            a.getDate() === b.getDate() &&
            a.getMonth() === b.getMonth() &&
            a.getFullYear() === b.getFullYear()
        );
    }

    addDays(d, n) {
        const date = new Date(d);

        date.setDate(date.getDate() + n);

        return date;
    }

    getStartDate() {
        const date = new Date(
            this.props.selectedMonth.getFullYear(),
            this.props.selectedMonth.getMonth(),
            1
        );

        while (date.getDay() !== 0) {
            date.setDate(date.getDate() - 1);
        }

        return date;
    }

    isDateDisabled(date) {
        return (
            this.props.isDateDisabled(date) ||
            (this.props.maxValue && date > this.props.maxValue) ||
            (this.props.minValue && date < this.props.minValue)
        );
    }
}

export default Calendar;
