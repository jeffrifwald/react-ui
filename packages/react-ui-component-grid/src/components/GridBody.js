import React from 'react';
import classNames from 'react-ui-helper-class-names';


export const renderRecordValue = (record, column, rowIndex, columnIndex) => {
    if (!record) {
        return null;
    }

    if (typeof column.render === 'function') {
        return column.render(record, column, rowIndex, columnIndex);
    }

    return record[column.dataProp];
};

const GridBody = (props) => {
    const rows = props.data.map((record, rowIndex) => {
        const cells = props.columns.map((column, columnIndex) => {
            const onClickCell = (evt) => props.onClickCell(
                evt,
                record,
                column,
                rowIndex,
                columnIndex
            );
            const cellClassName = classNames({
                'react-ui-grid-cell': true,
                'react-ui-grid-cell-selected': (
                    props.selectedCell[0] === rowIndex &&
                    props.selectedCell[1] === columnIndex
                )
            });

            return (
                <td
                className={cellClassName}
                key={columnIndex}
                onClick={onClickCell}>
                    {renderRecordValue(record, column, rowIndex, columnIndex)}
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
        <tbody>
            {rows}
        </tbody>
    );
};

GridBody.propTypes = {
    data: React.PropTypes.array,
    columns: React.PropTypes.array,
    onClickCell: React.PropTypes.func,
    selectedCell: React.PropTypes.array
};

GridBody.defaultProps = {
    data: [],
    columns: [],
    onClickCell: () => {},
    selectedCell: [-1, -1]
};

export default GridBody;
