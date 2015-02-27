/**
 * @class Cell
 * Renders a cell for the grid.
 */
var Cell = React.createClass({
    render: function() {
        return (
            <td
            className={this.props.className}
            onClick={this.onClick}>
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
    },

    /**
     * @method onClick
     * Calls the click handler when the cell is clicked.
     */
    onClick: function(evt) {
        this.props.onClick(
            this.props.record,
            this.props.column,
            this.props.rowIndex,
            this.props.columnIndex,
            evt
        );
    }
});

module.exports = Cell;
