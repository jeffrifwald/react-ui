var Header = require('./Header');
var Row = require('./Row');

/** @method emptyFn - Default handler for all events */
var emptyFn = function() {};

/**
 * @class Grid
 * A grid for rendering data.
 */
var Grid = React.createClass({displayName: "Grid",
    propTypes: {

        /** @prop {*[]} data - An array of data for the grid. */
        data: React.PropTypes.array.isRequired,

        /** @prop {Object[]} columns - An array of column objects for the grid. */
        columns: React.PropTypes.array.isRequired,

        /** @prop {String} cellClassName - The className of the grid's cells. */
        cellClassName: React.PropTypes.string,

        /** @prop {String} clickedHeaderClassName - The className appended to the last clicked grid header. */
        clickedHeaderClassName: React.PropTypes.string,

        /** @prop {String} gridClassName - The className of the grid. */
        gridClassName: React.PropTypes.string,

        /** @prop {String} headerClassName - The className of the grid's headers. */
        headerClassName: React.PropTypes.string,

        /** @prop {Function} onHeaderClick - The method called when a grid header is clicked. */
        onHeaderClick: React.PropTypes.func,

        /** @prop {String} rowClassName - The className of the grid's rows. */
        rowClassName: React.PropTypes.string,

        /** @prop {String} loadingMaskClassName - The className of the grid's loading mask. */
        loadingMaskClassName: React.PropTypes.string,

        /** @prop {Boolean} showLoading - True to show a loading mask. */
        showLoadingMask: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            cellClassName: 'react-ui-grid-cell',
            clickedHeaderClassName: 'react-ui-grid-header-clicked',
            gridClassName: 'react-ui-grid',
            headerClassName: 'react-ui-grid-header',
            loadingMaskClassName: 'react-ui-grid-loading-mask',
            onHeaderClick: emptyFn,
            rowClassName: 'react-ui-grid-row',
            showLoadingMask: false
        };
    },

    getInitialState: function() {
        return {
            clickedIndex: -1
        };
    },

    render: function() {
        return (
            React.createElement("table", {className: this.props.gridClassName}, 
                React.createElement("thead", null, 
                    React.createElement("tr", {className: this.props.rowClassName}, 
                        this.renderHeaders()
                    )
                ), 

                React.createElement("tbody", null, 
                    this.renderLoadingMask(), 
                    this.renderRows()
                )
            )
        );
    },

    /**
     * @renderHeaders
     * Gets an array of header components for the grid.
     * @returns {Object[]} - An array of Header components.
     */
    renderHeaders: function() {
        return this.props.columns.map(function(column, columnIndex) {
            return (
                React.createElement(Header, {
                className: this.props.headerClassName, 
                clickedClassName: this.props.clickedHeaderClassName, 
                clickedIndex: this.state.clickedIndex, 
                column: column, 
                columnIndex: columnIndex, 
                columns: this.props.columns, 
                key: columnIndex, 
                onClick: this.onHeaderClick})
            );
        }, this);
    },

    /**
     * @renderLoadingMask
     * Renders the loading mask if updating.
     * @returns {Object} - An loading mask component.
     */
    renderLoadingMask: function() {
        return this.props.showLoadingMask ? (
            React.createElement("div", {className: this.props.loadingMaskClassName}
            )
        ) : null;
    },

    /**
     * @renderRows
     * Gets an array of row components for the grid.
     * @returns {Object[]} - An array of Row components.
     */
    renderRows: function() {
        return this.props.data.map(function(record, rowIndex) {
            return (
                React.createElement(Row, {
                className: this.props.rowClassName, 
                cellClassName: this.props.cellClassName, 
                columns: this.props.columns, 
                key: rowIndex, 
                record: record, 
                rowIndex: rowIndex})
            );
        }, this);
    },

    /**
     * @method onHeaderClick
     * Saves the index of the last clicked header as component state.
     * Calls the onHeaderClick handler.
     * @param {Object} column - The clicked column.
     * @param {Number} columnIndex - The index of the clicked column.
     * @param {Boolean} reverse - True if the header has been clicked an odd number of times.
     */
    onHeaderClick: function(column, columnIndex, reverse) {
        this.setState({clickedIndex: columnIndex});
        this.props.onHeaderClick(column, columnIndex, reverse);
    }
});

module.exports = Grid;
