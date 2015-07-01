import React from 'react';

import {
    BLUR_DELAY_MS,
    debounce,
    getClassName,
    noop
} from '../../utils';
import Calendar from './Calendar';


class DatePicker extends React.Component {
    constructor(...args) {
        super(...args);

        const today = this.getToday();

        this.state = {
            showCalendar: false,
            today: today,
            selectedMonth: this.getSelectedMonth(
                this.props.defaultValue || today
            ),
            value: (
                this.props.defaultValue ?
                this.cleanDate(this.props.defaultValue) :
                undefined
            )
        };
        this.delayBlur = debounce(
            this.onBlur.bind(this),
            BLUR_DELAY_MS
        );
        this.onCalendarClick = this.onCalendarClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onDateClick = this.onDateClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    render() {
        const className = getClassName(
            'react-ui-date-picker',
            this.props.className,
            this.state.showCalendar ? 'react-ui-date-picker-open' : ''
        );

        return (
            <div
            className={className}
            onBlur={this.delayBlur}
            onClick={this.onClick}
            tabIndex={9999}>
                <input
                disabled={this.props.disabled}
                name={this.props.name}
                type="hidden"
                value={this.state.value} />

                <div className="react-ui-date-picker-inner">
                    {this.renderValue()}

                    <div className="react-ui-date-picker-controls">
                        {this.renderClear()}
                        {this.renderTrigger()}
                    </div>
                </div>

                {this.renderCalendar()}
            </div>
        );
    }

    renderValue() {
        const className = getClassName(
            'react-ui-date-picker-value',
            this.props.valueClassName,
            !this.state.value ? 'react-ui-date-picker-placeholder' : ''
        );
        const display = (
            this.state.value ?
            this.props.getDisplay(this.state.value) :
            this.props.placeholder
        );
        const value = (
            this.state.value ?
            this.props.getValue(this.state.value) :
            this.state.value
        );

        return (
            <span className={className}>
                <input
                disabled={this.props.disabled}
                name={this.props.name}
                type="hidden"
                value={value} />

                {display}
            </span>
        );
    }

    renderTrigger() {
        const className = getClassName(
            'react-ui-date-picker-trigger',
            this.props.triggerClassName
        );

        return (<span className={className}></span>);
    }

    renderClear() {
        const className = getClassName(
            'react-ui-date-picker-clear',
            this.props.clearClassName
        );

        return this.state.value ? (
            <span
            className={className}
            onClick={this.onClearClick}>
            </span>
        ) : null;
    }

    renderCalendar() {
        return this.state.showCalendar ? (
            <Calendar
            {...this.props}
            {...this.state}
            onCalendarClick={this.onCalendarClick}
            onDateClick={this.onDateClick}
            onNextClick={this.onNextClick}
            onPreviousClick={this.onPreviousClick} />
        ) : null;
    }

    onBlur() {
        this.hideCalendar();
    }

    onClearClick(evt) {
        evt.stopPropagation();
        this.props.onClearClick(evt);
        this.clear();
    }

    onClick() {
        this.props.onClick(this.state.showCalendar);

        if (this.state.showCalendar) {
            this.hideCalendar();
        } else {
            this.showCalendar();
        }
    }

    onCalendarClick(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
    }

    onDateClick(date, disabled, evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();

        if (!disabled) {
            this.props.onDateClick();
            this.setState({
                selectedMonth: this.getSelectedMonth(date),
                showCalendar: false,
                value: date
            });
        }
    }

    onNextClick(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
        this.setState({
            selectedMonth: this.addMonths(this.state.selectedMonth, 1)
        });
    }

    onPreviousClick(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
        this.setState({
            selectedMonth: this.addMonths(this.state.selectedMonth, -1)
        });
    }

    clear() {
        this.setState({value: undefined});
    }

    hideCalendar() {
        this.setState({showCalendar: false});
    }

    showCalendar() {
        this.setState({showCalendar: true});
    }

    addMonths(d, n) {
        const date = new Date(d);

        date.setMonth(date.getMonth() + n);

        return date;
    }

    getToday() {
        return this.cleanDate(new Date());
    }

    getSelectedMonth(date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        );
    }

    cleanDate(date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    }
}

DatePicker.propTypes = {
    calendarClassName: React.PropTypes.string,
    calendarHeaderClassName: React.PropTypes.string,
    calendarSubHeaderClassName: React.PropTypes.string,
    calendarBodyClassName: React.PropTypes.string,
    calendarHeaderNextClassName: React.PropTypes.string,
    calendarHeaderPreviousClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    getDisplay: React.PropTypes.func,
    getValue: React.PropTypes.func,
    isDateDisabled: React.PropTypes.func,
    name: React.PropTypes.string,
    onClearClick: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onDateClick: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    triggerClassName: React.PropTypes.string,
    valueClassName: React.PropTypes.string
};

DatePicker.defaultProps = {
    getValue: (date) => (
        `${date.getFullYear()}-` +
        `${date.getMonth() + 1}-` +
        `${date.getDate()} `
    ),
    getDisplay: (date) => (
        `${date.getMonth() + 1}/` +
        `${date.getDate()}/` +
        `${date.getFullYear()}`
    ),
    dayNames: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ],
    isDateDisabled: () => false,
    monthNames: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ],
    onClearClick: noop,
    onClick: noop,
    onDateClick: noop,
    placeholder: ''
};

export default DatePicker;
