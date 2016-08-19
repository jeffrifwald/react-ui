import React from 'react';
import classNames from 'react-ui-helper-class-names';


class DatePicker extends React.Component {
    constructor(...args) {
        super(...args);

        const selectedDate = this.props.defaultValue || new Date();
        const value = this.props.defaultValue ? new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
        ) : '';
        const selectedMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
        );
        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        this.state = {
            selectedMonth: selectedMonth,
            showCalendar: this.props.defaultShowCalendar,
            today: today,
            value: value
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.onClickDocument);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickDocument);
    }

    render() {
        const className = classNames({
            'react-ui-date-picker': true,
            'react-ui-date-picker-disabled': this.props.disabled,
            'react-ui-date-picker-open': this.state.showCalendar,
            [this.props.className]: this.props.className
        });

        return (
            <div className={className} ref="datePicker">
                {this.renderInput()}
                {this.renderCalendar()}
            </div>
        );
    }

    renderInput() {
        const value = (
            this.state.value ?
            this.props.getValue(this.state.value) :
            this.state.value
        );
        const display = (
            this.state.value ?
            this.props.renderDisplay(this.state.value) :
            this.props.placeholder
        );
        const valueClassName = (
            this.state.value ?
            'react-ui-date-picker-value' :
            'react-ui-date-picker-placeholder'
        );

        return (
            <div className="react-ui-date-picker-wrapper">
                <input
                disabled={this.props.disabled}
                name={this.props.name}
                type="hidden"
                value={value} />

                <span className={valueClassName}>
                    {display}
                </span>

                <div className="react-ui-date-picker-controls">
                    {this.renderClear()}
                </div>
            </div>
        );
    }

    renderClear() {
        return (
            this.props.showClear &&
            this.state.value &&
            !this.props.disabled
        ) ? (
            <span
            className="react-ui-date-picker-clear"
            onClick={this.onClickClear}>
            </span>
        ) : null;
    }

    renderCalendar() {
        return this.state.showCalendar ? (
            <table className="react-ui-date-picker-calendar">
                <thead className="react-ui-date-picker-calendar-head">
                    {this.renderCalendarControls()}
                    {this.renderCalendarHeader()}
                </thead>

                <tbody className="react-ui-date-picker-calendar-body">
                    {this.renderCalendarBody()}
                </tbody>
            </table>
        ) : null;
    }

    renderCalendarControls() {
        return (
            <tr className="react-ui-date-picker-calendar-controls">
                <td
                className="react-ui-date-picker-calendar-previous"
                onClick={this.onClickPrevious}>
                    <span className="react-ui-date-picker-calendar-previous-icon"></span>
                </td>

                <td
                className="react-ui-date-picker-calendar-title"
                colSpan={5}>
                    {this.renderCalendarMonthSelector()}
                    <span> </span>
                    {this.renderCalendarYearSelector()}
                </td>

                <td
                className="react-ui-date-picker-calendar-next"
                onClick={this.onClickNext}>
                    <span className="react-ui-date-picker-calendar-next-icon"></span>
                </td>
            </tr>
        );
    }

    renderCalendarMonthSelector() {
        const date = this.state.selectedMonth;
        const monthOptions = this.props.monthNames.map((name, i) => (
            <option key={i} value={i}>
                {name}
            </option>
        ));
        const monthDisplay = this.props.monthNames[date.getMonth()];

        return this.props.showMonthSelector ? (
            <select
            className="react-ui-date-picker-calendar-month-selector"
            onChange={this.onChangeMonth}
            value={date.getMonth()}>
                {monthOptions}
            </select>
        ) : (
            <span className="react-ui-date-picker-calendar-month-value">
                {monthDisplay}
            </span>
        );
    }

    renderCalendarYearSelector() {
        const date = this.state.selectedMonth;

        return this.props.showYearSelector ? (
            <select
            className="react-ui-date-picker-calendar-year-selector"
            onChange={this.onChangeYear}
            value={date.getFullYear()}>
                {this.renderYearOptions()}
            </select>
        ) : (
            <span className="react-ui-date-picker-calendar-year-value">
                {date.getFullYear()}
            </span>
        );
    }

    renderYearOptions() {
        const years = [this.props.minValue.getFullYear()];
        const maxYear = this.props.maxValue.getFullYear();

        while (years[years.length - 1] < maxYear) {
            years.push(years[years.length - 1] + 1);
        }

        return years.map((year, i) => (
            <option key={i} value={year}>
                {year}
            </option>
        ));
    }

    renderCalendarHeader() {
        const headers = this.props.dayNames.map((name) => name[0]).map((name, i) => (
            <th className="react-ui-date-picker-calendar-header-day" key={i}>
                {name}
            </th>
        ));

        return (
            <tr className="react-ui-date-picker-calendar-header">
                {headers}
            </tr>
        );
    }

    renderCalendarBody() {
        return this.getCalendarDates().map((week, i) => {
            const days = week.map((day, j) => {
                const disabled = this.isDateDisabled(day);
                const value = this.state.value;
                const today = this.state.today;
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
                    this.state.selectedMonth.getMonth() === day.getMonth() ?
                    'react-ui-date-picker-calendar-selected-month' :
                    null
                );
                const dayClassName = classNames(
                    'react-ui-date-picker-calendar-day',
                    currentDayClass,
                    selectedMonthClass,
                    disabledDayClass,
                    selectedDayClass
                );
                const onClick = (evt) => this.onClickDate(evt, day, disabled);

                return (
                    <td
                    className={dayClassName}
                    disabled={disabled}
                    key={j}
                    onClick={onClick}>
                        <span className="react-ui-date-picker-calendar-day-container">
                            {day.getDate()}
                        </span>
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

    getCalendarDates() {
        const startDate = this.getFirstCalendarDate(this.state.selectedMonth);
        const dates = [startDate];
        const weeks = [];

        while (dates.length < 42) {
            dates.push(this.getNextCalendarDate(dates[dates.length - 1]));
        }

        for (let i = 0; i < 42; i += 7) {
            weeks.push(dates.slice(i, i + 7));
        }

        return weeks;
    }

    getFirstCalendarDate(d) {
        const date = new Date(
            d.getFullYear(),
            d.getMonth(),
            1
        );

        while (date.getDay() !== 0) {
            date.setDate(date.getDate() - 1);
        }

        return date;
    }

    getNextCalendarDate(d) {
        const date = new Date(d);

        date.setDate(date.getDate() + 1);

        return date;
    }

    datesEqual(a, b) {
        return (
            a.getDate() === b.getDate() &&
            a.getMonth() === b.getMonth() &&
            a.getFullYear() === b.getFullYear()
        );
    }

    isDateDisabled(date) {
        return (
            this.props.isDateDisabled(date) ||
            date > this.props.maxValue ||
            date < this.props.minValue
        );
    }

    clear() {
        this.setState({value: undefined});
    }

    showCalendar() {
        if (!this.state.showCalendar) {
            this.setState({showCalendar: true});
        }
    }

    hideCalendar() {
        if (this.state.showCalendar) {
            this.setState({showCalendar: false});
        }
    }

    toggleCalendar() {
        this.setState({showCalendar: !this.state.showCalendar});
    }

    onChangeMonth = (evt) => {
        const selectedMonth = new Date(
            this.state.selectedMonth.getFullYear(),
            evt.target.options[evt.target.selectedIndex].value,
            1
        );

        evt.stopPropagation();
        this.setState({selectedMonth: selectedMonth});
    };

    onChangeYear = (evt) => {
        const selectedMonth = new Date(
            evt.target.options[evt.target.selectedIndex].value,
            this.state.selectedMonth.getMonth(),
            1
        );

        evt.stopPropagation();
        this.setState({selectedMonth: selectedMonth});
    };

    onClick = () => {
        if (!this.props.disabled) {
            this.toggleCalendar();
        }
    };

    onClickClear = (evt) => {
        evt.stopPropagation();
        this.clear();
    };

    onClickDate = (evt, date, disabled) => {
        evt.stopPropagation();

        if (!disabled) {
            this.setState({
                selectedMonth: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    1
                ),
                showCalendar: false,
                value: date
            }, () => {
                this.props.onChange(evt, date, disabled);
            });
        }
    };

    onClickDocument = (evt) => {
        if (this.refs.datePicker.contains(evt.target)) {
            this.showCalendar();
        } else {
            this.hideCalendar();
        }
    };

    onClickNext = (evt) => {
        const selectedMonth = new Date(this.state.selectedMonth);

        selectedMonth.setMonth(selectedMonth.getMonth() + 1);

        evt.stopPropagation();
        this.setState({selectedMonth: selectedMonth});
    };

    onClickPrevious = (evt) => {
        const selectedMonth = new Date(this.state.selectedMonth);

        selectedMonth.setMonth(selectedMonth.getMonth() - 1);

        evt.stopPropagation();
        this.setState({selectedMonth: selectedMonth});
    };
}

DatePicker.propTypes = {
    className: React.PropTypes.string,
    dayNames: React.PropTypes.array,
    defaultShowCalendar: React.PropTypes.bool,
    defaultValue: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    getValue: React.PropTypes.func,
    isDateDisabled: React.PropTypes.func,
    maxValue: React.PropTypes.object,
    minValue: React.PropTypes.object,
    monthNames: React.PropTypes.array,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    renderDisplay: React.PropTypes.func,
    showClear: React.PropTypes.bool,
    showMonthSelector: React.PropTypes.bool,
    showYearSelector: React.PropTypes.bool
};

DatePicker.defaultProps = {
    dayNames: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ],
    defaultShowCalendar: false,
    disabled: false,
    getValue: (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
    isDateDisabled: () => false,
    maxValue: new Date(2050, 1, 1),
    minValue: new Date(1950, 1, 1),
    monthNames: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ],
    onChange: () => {},
    renderDisplay: (d) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
    showClear: true,
    showMonthSelector: false,
    showYearSelector: false
};

export default DatePicker;
