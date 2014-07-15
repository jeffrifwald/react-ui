/** @jsx React.DOM */

/**
 * @class Cell
 * Renders a cell for the grid.
 */
var Cell = React.createClass({
    render: function() {
        return (
            <td className={this.props.className}>
                {this.getData()}
            </td>
        );
    },

    /**
     * @method getData
     * Gets data for a given record and column.
     * Attemps to use the column.render method, then falls back to column.dataProp.
     * @returns {*} - The render method result or record data.
     */
    getData: function() {
        var column = this.props.column;
        var record = this.props.record;

        if (typeof column.render === 'function') {
            return column.render(record);
        }

        return record[column.dataProp];
    }
});

module.exports = Cell;
