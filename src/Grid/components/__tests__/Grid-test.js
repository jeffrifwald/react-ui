import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import fixtures from './fixtures';
import Grid from '../Grid';
import {TestUtils} from '../../../utils';


describe('Grid/Grid', () => {
    it('should render the correct top level elements', () => {
        const rendered = TestUtils.createComponent(
            <Grid columns={fixtures.columns} data={fixtures.data} />
        ).render();
        const header = rendered.props.children[0];
        const body = rendered.props.children[1];

        assert.equal(rendered.type, 'table');
        assert.equal(header.type, 'thead');
        assert.equal(body.type, 'tbody');
        assert.equal(
            header.props.children.props.children.length,
            2
        );
        assert.equal(body.props.children.length, 3);
    });

    it('should handle a cell click', () => {
        const onCellClick = stub();
        const component = TestUtils.createComponent(
            <Grid
            columns={fixtures.columns}
            data={fixtures.data}
            onCellClick={onCellClick} />
        );

        stub(component, 'setState');

        component.onCellClick(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        );
        assert.equal(onCellClick.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onCellClick.calledWith(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        ));
        assert.isTrue(component.setState.calledWith({
            activeCell: [1, 2]
        }));

        component.setState.restore();
    });

    it('should handle a row click', () => {
        const onRowClick = stub();
        const component = TestUtils.createComponent(
            <Grid
            columns={fixtures.columns}
            data={fixtures.data}
            onRowClick={onRowClick} />
        );

        stub(component, 'setState');

        component.onRowClick(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        );
        assert.equal(onRowClick.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onRowClick.calledWith(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        ));
        assert.isTrue(component.setState.calledWith({
            activeRow: 2
        }));

        component.setState.restore();
    });

    it('should handle a header click', () => {
        const onHeaderClick = stub();
        const component = TestUtils.createComponent(
            <Grid
            columns={fixtures.columns}
            data={fixtures.data}
            onHeaderClick={onHeaderClick} />
        );

        stub(component, 'setState');

        component.onHeaderClick(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        );
        assert.equal(onHeaderClick.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onHeaderClick.calledWith(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        ));
        assert.isTrue(component.setState.calledWith({
            activeHeader: 1
        }));

        component.setState.restore();
    });
});
