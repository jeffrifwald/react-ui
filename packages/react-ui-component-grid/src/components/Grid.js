import React from 'react';

import GridBody from './GridBody';
import GridHeader from './GridHeader';


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
        this.sortGridData();

        return (
            <table className="grid">
                <GridHeader
                {...this.props}
                {...this.state}
                onClick={this.onClickHeader} />

                <GridBody
                {...this.props}
                {...this.state}
                onClickCell={this.onClickCell}
                onClickRow={this.onClickRow} />
            </table>
        );
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

        if (column.sortProp) {
            return (record) => record && record[column.sortProp];
        }

        if (column.dataProp) {
            return (record) => record && record[column.dataProp];
        }

        return column.getSortValue;
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
