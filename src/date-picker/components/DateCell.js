/** @jsx React.DOM */

var utils = require('./utils');

var DateCell = React.createClass({
    render: function() {
        return (
            <td
            className={this.getClassName()}
            onMouseDown={this.onMouseDown}>
                {this.props.value.getDate()}
            </td>
        );
    },

    /**
     * @method onMouseDown
     * If selectable, calls the given onMouseDown method.
     */
    onMouseDown: function() {
        if (this.isSelectable()) {
            this.props.onMouseDown(this.props.value);
        }
    },

    /**
     * @method getClassNames
     * Gets a class name for the cell.
     * Examines current, selected, selectable, and same month criteria.
     * @returns {String} - The constructed class name.
     */
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

    /**
     * @method isSelectable
     * Determines if the cell should be selectable.
     * Calls the isDateDisabled method, compares to given disabled dates.
     * Compares against max and min dates.
     * @returns {Boolean} - True if the date is selectable.
     */
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

    /**
     * @method isCurrent
     * Determines if the cell is the current date.
     * @returns {Boolean} - True if the cell contains the current date.
     */
    isCurrent: function() {
        return utils.sameDate(this.props.value, new Date());
    },

    /**
     * @method isSelected
     * Determines if the cell is selected.
     * @returns {Boolean} - True if the cell is selected.
     */
    isSelected: function() {
        return this.props.selected && utils.sameDate(this.props.value, this.props.selected) ? true : false;
    }
});

module.exports = DateCell;
