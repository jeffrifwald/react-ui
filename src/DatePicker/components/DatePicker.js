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

        this.state = {
            showCalendar: false,
            value: this.props.defaultValue || this.cleanDate(new Date())
        };
        this.delayBlur = debounce(
            this.onBlur.bind(this),
            BLUR_DELAY_MS
        );
        this.onCalendarClick = this.onCalendarClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
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
            onClick={this.onCalendarClick} />
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
        this.props.onCalendarClick(evt);
        this.delayBlur.cancel();
    }

    clear() {
        this.setState({value: this.getToday()});
    }

    hideCalendar() {
        this.setState({showCalendar: false});
    }

    showCalendar() {
        this.setState({showCalendar: true});
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
    name: React.PropTypes.string,
    triggerClassName: React.PropTypes.string,
    valueClassName: React.PropTypes.string
};

DatePicker.defaultProps = {
     getValue: (date) => (
        `${date.getFullYear()}-` +
        `${date.getMonth() + 1}-` +
        `${date.getDate()}`
    ),
    getDisplay: (date) => (
        `${date.getMonth() + 1}-` +
        `${date.getDate()}-` +
        `${date.getFullYear()}`
    ),
    dayNames: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ],
    onCalendarClick: noop,
    onClearClick: noop,
    onClick: noop,
    placeholder: ''
};

export default DatePicker;
