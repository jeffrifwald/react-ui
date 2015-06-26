import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import fixtures from './fixtures';
import Cell from '../Cell';
import {TestUtils} from '../../../utils';


describe('Grid/Cell', () => {
    it('should render the correct element', () => {
        const rendered = TestUtils.createComponent(
            <Cell
            activeCell={[0, 0]}
            columns={fixtures.columns}
            column={fixtures.columns[0]}
            record={fixtures.data[0]} />
        ).render();

        assert.equal(rendered.type, 'td');
        assert.equal(rendered.props.children, '1');
    });

    it('should render the correct element with a column renderer', () => {
        const rendered = TestUtils.createComponent(
            <Cell
            activeCell={[0, 0]}
            columns={fixtures.columns}
            column={fixtures.columns[1]}
            record={fixtures.data[0]} />
        ).render();


        assert.equal(rendered.props.children.type, 'div');
        assert.equal(
            rendered.props.children.props.children,
            'My name is Cool McCool.'
        );
    });

    it('should handle onClick', () => {
        const onCellClick = stub();
        const component = TestUtils.createComponent(
            <Cell
            activeCell={[0, 0]}
            column={fixtures.columns[0]}
            columnIndex={0}
            onCellClick={onCellClick}
            record={fixtures.data[0]}
            rowIndex={0} />
        );

        stub(component, 'setState');

        component.onClick('mock evt');
        assert.equal(onCellClick.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onCellClick.calledWith(
            'mock evt',
            fixtures.columns[0],
            0,
            0,
            fixtures.data[0],
            1
        ));
        assert.isTrue(component.setState.calledWith({
            numClicks: 1
        }));

        component.setState.restore();
    });

    it('should get special class names', () => {
        const component = TestUtils.createComponent(
            <Cell
            activeCell={[0, 0]}
            column={fixtures.columns[0]}
            columnIndex={0}
            record={fixtures.data[0]}
            rowIndex={0} />
        );

        assert.equal(
            component.getClassName(),
            'react-ui-grid-cell react-ui-grid-cell-active'
        );
    });
});
