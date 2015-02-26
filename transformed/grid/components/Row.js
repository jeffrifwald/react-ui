var Cell = require('./Cell');

/**
 * @class Row
 * Renders a row of cells for the grid.
 */
var Row = React.createClass({displayName: "Row",
    render: function() {
        return (
            React.createElement("tr", {className: this.props.className}, 
                this.renderCell()
            )
        );
    },

    /**
     * @renderCell
     * Gets an array of cell components for the row.
     * @returns {Object[]} - An array of Cell components.
     */
    renderCell: function() {
        return this.props.columns.map(function(column, columnIndex) {
            return (
                React.createElement(Cell, {
                className: this.props.cellClassName, 
                column: column, 
                columns: this.props.columns, 
                columnIndex: columnIndex, 
                onClick: this.props.onCellClick, 
                key: columnIndex, 
                record: this.props.record, 
                rowIndex: this.props.rowIndex})
            );
        }, this);
    }
});

module.exports = Row;
