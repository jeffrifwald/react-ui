/** @jsx React.DOM */

var DateCell = require('./DateCell');

var Calendar = React.createClass({displayName: 'Calendar',
    render: function() {
        if (!this.props.visible) {
            return null;
        }

        return (
             React.DOM.table({className: this.props.className}, 
                this.renderHeader(), 
                React.DOM.tr(null, this.renderDayNames()), 
                this.renderRows()
            )
        );
    },

    renderHeader: function() {
        var monthName = this.props.monthNames[this.props.date.getMonth()];
        var header = monthName + ' ' + this.props.date.getFullYear();

        return (
            React.DOM.tr({className: this.props.headerClassName}, 
                React.DOM.td({
                className: this.props.prevClassName, 
                onClick: this.props.onPrevClick}, 
                    this.props.prevChar
                ), 

                React.DOM.td({className: this.props.monthClassName, colSpan: "5"}, header), 

                React.DOM.td({
                className: this.props.nextClassName, 
                onClick: this.props.onNextClick}, 
                    this.props.nextChar
                )
            )
        );
    },

    renderDayNames: function() {
        return this.props.dayNames.map(function(name, i) {
            return (React.DOM.th({key: i}, name.slice(0, 1)));
        }, this);
    },

    renderDays: function(days) {
        return days.map(function(day, i) {
            return (
                DateCell({
                className: this.props.dateClassName, 
                date: this.props.date, 
                disabledDates: this.props.disabledDates, 
                isDateDisabled: this.props.isDateDisabled, 
                key: i, 
                maxValue: this.props.maxValue, 
                minValue: this.props.minValue, 
                onMouseDown: this.props.onDateMouseDown, 
                selected: this.props.selected, 
                value: day})
            );
        }, this);
    },

    renderRows: function() {
        var rows = [];
        var row, start, end;

        while (rows.length < 6) {
            start = rows.length * 7;
            end = rows.length * 7 + 7;
            row = this.renderDays(this.props.days.slice(start, end));
            rows.push(
                React.DOM.tr({className: this.props.rowClassName, key: rows.length}, 
                    row
                )
            );
        }

        return rows;
    }
});

module.exports = Calendar;
