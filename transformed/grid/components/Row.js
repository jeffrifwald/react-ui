/** @jsx React.DOM */

var Cell = require('./Cell');

/**
 * @class Row
 * Renders a row of cells for the grid.
 */
var Row = React.createClass({displayName: 'Row',
    render: function() {
        return (
            React.DOM.tr( {className:this.props.className}, 
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
        var record = this.props.record;
        var rowIndex = this.props.rowIndex;

        return this.props.columns.map(function(column, columnIndex) {
            var key = 'react-ui-grid-cell-' + rowIndex + '-' + columnIndex;

            return (
                Cell(
                {className:this.props.cellClassName,
                column:column,
                columns:this.props.columns,
                key:key,
                record:record} )
            );
        }, this);
    }
});

module.exports = Row;
