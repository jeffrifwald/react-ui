import React from 'react';
import classNames from 'react-ui-helper-class-names';


class Grid extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            selectedCell: this.props.defaultSelectedCell,
            sortedColumn: this.props.defaultSortedColumn,
            sortReverse: this.props.defaultSortReverse
        };
        this.perf = {shouldSort: true};
    }

    render() {
        const className = classNames({
            'react-ui-grid': true,
            [this.props.className]: this.props.className
        });

        this.sortGridData();

        return (
            <table className={className}>
                {this.renderHeader()}
                {this.renderBody()}
            </table>
        );
    }

    renderHeader() {
        const headers = this.props.columns.map((column, i) => {
            const sorted = this.state.sortedColumn === i;
            const reverse = this.state.sortReverse;
            const nextReverse = sorted ? !reverse : false;
            const sortedAsc = sorted && !reverse;
            const sortedDsc = sorted && reverse;
            const className = classNames({
                'react-ui-grid-header-cell': true,
                'react-ui-grid-header-sorted-asc': sortedAsc,
                'react-ui-grid-header-sorted-dsc': sortedDsc
            });
            const onClick = (evt) => this.onClickHeader(evt, column, i, nextReverse);

            return (
                <th
                className={className}
                key={i}
                onClick={onClick}>
                    {this.renderColumnHeader(column)}
                </th>
            );
        });

        return (
            <thead className="react-ui-grid-header">
                <tr className="react-ui-grid-row">
                    {headers}
                </tr>
            </thead>
        );
    }

    renderBody() {
        const rows = this.props.data.map((record, rowIndex) => {
            const cells = this.props.columns.map((column, columnIndex) => {
                const onClickCell = (evt) => this.onClickCell(
                    evt,
                    record,
                    column,
                    rowIndex,
                    columnIndex
                );
                const cellClassName = classNames({
                    'react-ui-grid-cell': true,
                    'react-ui-grid-cell-selected': (
                        this.state.selectedCell[0] === rowIndex &&
                        this.state.selectedCell[1] === columnIndex
                    )
                });

                return (
                    <td
                    className={cellClassName}
                    key={columnIndex}
                    onClick={onClickCell}>
                        {this.renderRecordValue(record, column, rowIndex, columnIndex)}
                    </td>
                );
            });

            return (
                <tr
                className="react-ui-grid-row"
                key={rowIndex}>
                    {cells}
                </tr>
            );
        });

        return (
            <tbody className="react-ui-grid-body">
                {rows}
            </tbody>
        );
    }

    renderColumnHeader(column) {
        if (typeof column.renderHeader === 'function') {
            return column.renderHeader();
        }

        return column.header;
    }

    renderRecordValue(record, column, rowIndex, columnIndex) {
        if (!record) {
            return null;
        }

        if (typeof column.render === 'function') {
            return column.render(record, column, rowIndex, columnIndex);
        }

        return record[column.dataProp];
    }

    sortGridData() {
        if (!this.shouldSort()) {
            return;
        }

        const larger = this.state.sortReverse ? -1 : 1;
        const smaller = this.state.sortReverse ? 1 : -1;
        const sortGetter = this.getSortGetter();

        this.perf.shouldSort = false;
        this.props.data.sort((a, b) => {
            const aSortValue = sortGetter(a);
            const bSortValue = sortGetter(b);

            if (aSortValue > bSortValue) {
                return larger;
            }

            if (aSortValue < bSortValue) {
                return smaller;
            }

            return 0;
        });
    }

    getSortGetter() {
        const column = this.props.columns[this.state.sortedColumn];

        if (typeof column.getSortValue === 'function') {
            return column.getSortValue;
        }

        const propName = column.sortProp ? 'sortProp' : 'dataProp';

        return (record) => record && record[column[propName]];
    }

    shouldSort() {
        return this.perf.shouldSort && this.props.columns[this.state.sortedColumn];
    }

    onClickCell = (evt, record, column, rowIndex, columnIndex) => {
        this.setState({
            selectedCell: [rowIndex, columnIndex]
        }, () => {
            this.props.onClickCell(evt, record, column, rowIndex, columnIndex);
        });
    };

    onClickHeader = (evt, column, columnIndex, reverse) => {
        this.perf.shouldSort = true;
        this.setState({
            sortedColumn: columnIndex,
            sortReverse: reverse
        }, () => {
            this.props.onClickHeader(evt, column, columnIndex, reverse);
        });
    };
}

Grid.propTypes = {
    className: React.PropTypes.string,
    columns: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    defaultSelectedCell: React.PropTypes.array,
    defaultSortedColumn: React.PropTypes.number,
    defaultSortReverse: React.PropTypes.bool,
    onClickCell: React.PropTypes.func,
    onClickHeader: React.PropTypes.func
};

Grid.defaultProps = {
    columns: [],
    data: [],
    defaultSelectedCell: [-1, -1],
    defaultSortedColumn: -1,
    defaultSortReverse: false,
    onClickCell: () => {},
    onClickHeader: () => {}
};

export default Grid;
