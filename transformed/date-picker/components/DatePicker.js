/** @jsx React.DOM */

var Calendar = require('./Calendar');
var Input = require('./Input');
var Trigger = require('./Trigger');
var utils = require('./utils');

var DatePicker = React.createClass({displayName: 'DatePicker',
    propTypes: {
        /** @prop {String} className - The className of the date picker. */
        className: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            calendarClassName: 'react-ui-date-picker-calendar',
            className: 'react-ui-date-picker',
            dateClassName: 'react-ui-date-picker-date',
            dayNames: [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ],
            disabledClassName: 'react-ui-date-picker-disabled',
            disabledDates: [],
            displayFormat: 'm/d/Y',
            headerClassName: 'react-ui-date-picker-header',
            inputClassName: 'react-ui-date-picker-input',
            isDateDisabled: function() {},
            labelClassName: 'react-ui-date-picker-label',
            maxValue: null,
            minValue: null,
            monthClassName: 'react-ui-date-picker-month',
            monthNames: [
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'
            ],
            nextChar: '\u00bb',
            nextClassName: 'react-ui-date-picker-next',
            prevChar: '\u00ab',
            prevClassName: 'react-ui-date-picker-prev',
            rowClassName: 'react-ui-date-picker-row',
            showTrigger: true,
            triggerClassName: 'react-ui-date-picker-trigger',
            triggerText: '',
            value: null,
            valueFormat: 'm/d/Y'
        };
    },

    getInitialState: function() {
        var date = utils.cleanDate(this.props.value || new Date());
        var selected = this.props.value ? utils.cleanDate(this.props.value) : null;
        var display = selected ? utils.format(selected, this.props.displayFormat) : null;
        var formatted = selected ? utils.format(selected, this.props.valueFormat) : null;

        return {
            calendarVisible: false,
            date: date,
            days: utils.getDays(date),
            display: display,
            formatted: formatted,
            selected: selected
        };
    },

    render: function() {
        return (
            React.DOM.div( {className:this.getClassName()}, 
                React.DOM.label( {className:this.props.labelClassName}, this.props.label),

                Input(
                {className:this.props.inputClassName,
                onClick:this.onInputClick,
                placeholder:this.props.placeholder,
                value:this.state.display} ),

                Trigger(
                {className:this.props.triggerClassName,
                onClick:this.onInputClick,
                showTrigger:this.props.showTrigger,
                triggerText:this.props.triggerText} ),

                React.DOM.input(
                {disabled:this.props.disabled,
                name:this.props.name,
                type:"hidden",
                value:this.state.formatted} ),

                Calendar(
                {className:this.props.calendarClassName,
                date:this.state.date,
                dateClassName:this.props.dateClassName,
                dayNames:this.props.dayNames,
                days:this.state.days,
                disabledDates:this.props.disabledDates,
                headerClassName:this.props.headerClassName,
                isDateDisabled:this.props.isDateDisabled,
                maxValue:this.props.maxValue,
                minValue:this.props.minValue,
                monthNames:this.props.monthNames,
                nextChar:this.props.nextChar,
                nextClassName:this.props.nextClassName,
                onDateMouseDown:this.onDateMouseDown,
                onNextClick:this.onNextClick,
                onPrevClick:this.onPrevClick,
                prevChar:this.props.prevChar,
                prevClassName:this.props.prevClassName,
                selected:this.state.selected,
                visible:this.state.calendarVisible} )

            )
        );
    },

    getClassName: function() {
        if (this.props.disabled) {
            return this.props.className + ' ' + this.props.disabledClassName;
        }

        return this.props.className;
    },

    onDateMouseDown: function(date) {
        this.setState({
            calendarVisible: false,
            date: date,
            days: utils.getDays(date),
            display: utils.format(date, this.props.displayFormat),
            formatted: utils.format(date, this.props.valueFormat),
            selected: date
        });
    },

    onInputClick: function() {
        if (!this.props.disabled) {
            this.setState({calendarVisible: !this.state.calendarVisible});
        }
    },

    onNextClick: function() {
        var date = new Date(this.state.date);

        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        this.setState({date: date, days: utils.getDays(date)});
    },

    onPrevClick: function() {
        var date = new Date(this.state.date);
        var days;

        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        days = utils.getDays(date)
        this.setState({date: date, days: days});
    }
});

module.exports = DatePicker;
