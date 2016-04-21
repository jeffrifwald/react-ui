import {shallow} from 'enzyme';
import React from 'react';
import {spy, stub} from 'sinon';
import test from 'tape';

import Grid from '../../src/components/Grid';


test('grid/components/Grid', (t) => {
    const columns = [{
        header: 'Name',
        render(record) {
            return record.name;
        }
    }, {
        dataProp: 'id',
        header: 'ID'
    }];
    const data = [{
        id: 1,
        name: 'Cool McCool'
    }, {
        id: 2,
        name: 'Neat McNeat'
    }];
    const wrapper = shallow(
        <Grid
        columns={columns}
        data={data} />
    );

    t.equal(wrapper.find('.react-ui-grid').length, 1);
    t.equal(wrapper.find('.react-ui-grid-header').length, 1);
    t.equal(wrapper.find('.react-ui-grid-body').length, 1);

    t.end();
});

test('grid/components/Grid.renderHeader', (t) => {
    spy(Grid.defaultProps, 'onClickHeader');

    const columns = [{
        header: 'Cool Header'
    }, {
        renderHeader() {
            return 'Cooler Header';
        }
    }];
    const data = [{
        id: 1,
        name: 'Cool McCool'
    }, {
        id: 2,
        name: 'Neat McNeat'
    }];
    const wrapper = shallow(
        <Grid
        columns={columns}
        data={data}
        defaultSortedColumn={0} />
    );
    const rows = wrapper.find('.react-ui-grid-row');
    const headers = wrapper.find('.react-ui-grid-header-cell');

    t.equal(rows.length, 3);
    t.equal(headers.length, 2);
    t.equal(headers.at(0).hasClass('react-ui-grid-header-sorted-asc'), true);

    headers.at(0).simulate('click', 'mock evt');
    t.equal(Grid.defaultProps.onClickHeader.callCount, 1);
    t.equal(Grid.defaultProps.onClickHeader.calledWith('mock evt', columns[0], 0, true), true);

    headers.at(1).simulate('click', 'mock evt');
    t.equal(Grid.defaultProps.onClickHeader.callCount, 2);
    t.equal(Grid.defaultProps.onClickHeader.calledWith('mock evt', columns[1], 1, false), true);

    Grid.defaultProps.onClickHeader.restore();
    t.end();
});

test('grid/components/Grid.renderBody', (t) => {
    spy(Grid.defaultProps, 'onClickCell');

    const columns = [{
        header: 'Name',
        render(record) {
            return record.name;
        }
    }, {
        dataProp: 'id',
        header: 'ID'
    }];
    const data = [{
        id: 1,
        name: 'Cool McCool'
    }, null, {

    }, {
        id: 2,
        name: 'Neat McNeat'
    }];
    const selectedCell = [0, 1];
    const wrapper = shallow(
        <Grid
        columns={columns}
        data={data}
        defaultSelectedCell={selectedCell} />
    );
    const rows = wrapper.find('.react-ui-grid-row');
    const cells = wrapper.find('.react-ui-grid-cell');

    t.equal(rows.length, 5);
    t.equal(cells.length, 8);
    t.equal(cells.at(1).hasClass('react-ui-grid-cell-selected'), true);

    cells.at(0).simulate('click', 'mock evt');
    t.equal(Grid.defaultProps.onClickCell.callCount, 1);
    t.equal(Grid.defaultProps.onClickCell.calledWith(
        'mock evt',
        data[0],
        columns[0],
        0,
        0
    ), true);

    Grid.defaultProps.onClickCell.restore();
    t.end();
});

test('grid/components/Grid.sortGridData - sortProp', (t) => {
    const columns = [{
        header: 'Name',
        sortProp: 'name'
    }, {
        dataProp: 'id',
        header: 'ID'
    }, {
        getSortValue: (record) => 0 - record.rank,
        header: 'Rank'
    }];
    const data = [{
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }, {
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }];
    const instance = shallow(
        <Grid
        columns={columns}
        data={data} />
    ).instance();

    instance.state.sortedColumn = 0;
    instance.state.sortReverse = false;
    instance.perf.shouldSort = false;
    instance.sortGridData();
    t.deepEqual(data, [{
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }, {
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }]);

    instance.state.sortedColumn = 0;
    instance.state.sortReverse = false;
    instance.perf.shouldSort = true;
    instance.sortGridData();
    t.deepEqual(data, [{
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }, {
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }]);
    t.equal(instance.perf.shouldSort, false);

    instance.state.sortedColumn = 0;
    instance.state.sortReverse = true;
    instance.perf.shouldSort = false;
    instance.sortGridData();
    t.deepEqual(data, [{
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }, {
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }]);
    t.equal(instance.perf.shouldSort, false);

    instance.state.sortedColumn = 0;
    instance.state.sortReverse = true;
    instance.perf.shouldSort = true;
    instance.sortGridData();
    t.deepEqual(data, [{
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }, {
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }]);
    t.equal(instance.perf.shouldSort, false);

    t.end();
});

test('grid/components/Grid.sortGridData - dataProp', (t) => {
    const columns = [{
        header: 'Name',
        sortProp: 'name'
    }, {
        dataProp: 'id',
        header: 'ID'
    }, {
        getSortValue: (record) => 0 - record.rank,
        header: 'Rank'
    }];
    const data = [{
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }, {
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }];
    const instance = shallow(
        <Grid
        columns={columns}
        data={data} />
    ).instance();

    instance.state.sortedColumn = 1;
    instance.state.sortReverse = false;
    instance.perf.shouldSort = true;
    instance.sortGridData();
    t.deepEqual(data, [{
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }, {
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }]);
    t.equal(instance.perf.shouldSort, false);

    t.end();
});

test('grid/components/Grid.sortGridData - getSortValue', (t) => {
    const columns = [{
        header: 'Name',
        sortProp: 'name'
    }, {
        dataProp: 'id',
        header: 'ID'
    }, {
        getSortValue: (record) => record.rank,
        header: 'Rank'
    }];
    const data = [{
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }, {
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }];
    const instance = shallow(
        <Grid
        columns={columns}
        data={data} />
    ).instance();

    instance.state.sortedColumn = 2;
    instance.state.sortReverse = false;
    instance.perf.shouldSort = true;
    instance.sortGridData();
    t.deepEqual(data, [{
        id: 3,
        name: 'Awesome McAwesome',
        rank: 1
    }, {
        id: 1,
        name: 'Cool McCool',
        rank: 2
    }, {
        id: 2,
        name: 'Neat McNeat',
        rank: 3
    }, {
        id: 4,
        name: 'Awesome McAwesome',
        rank: 4
    }]);
    t.equal(instance.perf.shouldSort, false);

    t.end();
});

test('grid/components/Grid.onClickCell', (t) => {
    spy(Grid.defaultProps, 'onClickCell');

    const columns = [{
        header: 'Name',
        sortProp: 'name'
    }];
    const data = [{
        name: 'Neat McNeat'
    }];
    const instance = shallow(
        <Grid
        columns={columns}
        data={data} />
    ).instance();

    stub(instance, 'setState', (state, cb) => cb());

    instance.onClickCell('mock evt', data[0], columns[0], 0, 0);
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({
        selectedCell: [0, 0]
    }), true);
    t.equal(Grid.defaultProps.onClickCell.callCount, 1);
    t.equal(Grid.defaultProps.onClickCell.calledWith(
        'mock evt',
        data[0],
        columns[0],
        0,
        0
    ), true);

    Grid.defaultProps.onClickCell.restore();
    instance.setState.restore();
    t.end();
});

test('grid/components/Grid.onClickHeader', (t) => {
    spy(Grid.defaultProps, 'onClickHeader');

    const columns = [{
        header: 'Name',
        sortProp: 'name'
    }];
    const data = [{
        name: 'Neat McNeat'
    }];
    const instance = shallow(
        <Grid
        columns={columns}
        data={data} />
    ).instance();

    stub(instance, 'setState', (state, cb) => cb());

    instance.onClickHeader('mock evt', columns[0], 0, false);
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({
        sortedColumn: 0,
        sortReverse: false
    }), true);
    t.equal(Grid.defaultProps.onClickHeader.callCount, 1);
    t.equal(Grid.defaultProps.onClickHeader.calledWith(
        'mock evt',
        columns[0],
        0,
        false
    ), true);

    Grid.defaultProps.onClickHeader.restore();
    instance.setState.restore();
    t.end();
});
