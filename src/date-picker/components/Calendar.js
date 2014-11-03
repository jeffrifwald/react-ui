var DateCell = require('./DateCell');

var Calendar = React.createClass({
    render: function() {
        if (!this.props.visible) {
            return null;
        }

        return (
             <table className={this.props.className}>
                {this.renderHeader()}
                <tr>{this.renderDayNames()}</tr>
                {this.renderRows()}
            </table>
        );
    },

    renderHeader: function() {
        var monthName = this.props.monthNames[this.props.date.getMonth()];
        var header = monthName + ' ' + this.props.date.getFullYear();

        return (
            <tr className={this.props.headerClassName}>
                <td
                className={this.props.prevClassName}
                onClick={this.props.onPrevClick}>
                    {this.props.prevChar}
                </td>

                <td className={this.props.monthClassName} colSpan="5">{header}</td>

                <td
                className={this.props.nextClassName}
                onClick={this.props.onNextClick}>
                    {this.props.nextChar}
                </td>
            </tr>
        );
    },

    renderDayNames: function() {
        return this.props.dayNames.map(function(name, i) {
            return (<th key={i}>{name.slice(0, 1)}</th>);
        }, this);
    },

    renderDays: function(days) {
        return days.map(function(day, i) {
            return (
                <DateCell
                className={this.props.dateClassName}
                date={this.props.date}
                disabledDates={this.props.disabledDates}
                isDateDisabled={this.props.isDateDisabled}
                key={i}
                maxValue={this.props.maxValue}
                minValue={this.props.minValue}
                onMouseDown={this.props.onDateMouseDown}
                selected={this.props.selected}
                value={day} />
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
                <tr className={this.props.rowClassName} key={rows.length}>
                    {row}
                </tr>
            );
        }

        return rows;
    }
});

module.exports = Calendar;
