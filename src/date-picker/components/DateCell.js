/** @jsx React.DOM */

var utils = require('./utils');

var DateCell = React.createClass({
    render: function() {
        // if (this.props.date.getMonth() !== this.props.value.getMonth()) {
        //     return (<td></td>);
        // }

        return (
            <td
            className={this.getClassName()}
            onMouseDown={this.onMouseDown}>
                {this.props.value.getDate()}
            </td>
        );
    },

    onMouseDown: function() {
        if (this.isSelectable()) {
            this.props.onMouseDown(this.props.value);
        }
    },

    getClassName: function() {
        var className = this.props.className;

        if (!this.isSelectable()) {
            return  className + ' disabled';
        }

        if (this.props.date.getMonth() !== this.props.value.getMonth()) {
            className += ' other-month';
        }

        if (this.isSelected()) {
            return className + ' selected-date';
        }

        if (this.isCurrent()) {
            return className + ' current-date';
        }

        return className;
    },

    isSelectable: function() {
        var curr = this.props.value;
        var max = this.props.maxValue;
        var min = this.props.minValue;

        if (this.props.isDateDisabled(curr)) {
            return false;
        }

        if (utils.isDisabledDate(this.props.value, this.props.disabledDates)) {
            return false;
        }

        if (max && curr > max) {
            return false;
        }

        if (min && curr < min) {
            return false;
        }

        return true;
    },

    isCurrent: function() {
        return utils.sameDate(this.props.value, new Date());
    },

    isSelected: function() {
        return this.props.selected && utils.sameDate(this.props.value, this.props.selected);
    }
});

module.exports = DateCell;
