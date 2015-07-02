import {assert} from 'chai';
import React from 'react';
import {stub} from 'sinon';

import fixtures from './fixtures';
import Header from '../Header';
import {TestUtils} from '../../../utils';


describe('Grid/Header', () => {
    it('should render the correct top level elements', () => {
        const columnIndex = 0;
        const column = fixtures.columns[columnIndex];
        const rendered = TestUtils.createComponent(
            <Header
            column={column}
            columnIndex={columnIndex} />
        ).render();

        assert.equal(rendered.type, 'th');
        assert.equal(rendered.props.children.type, 'span');
        assert.equal(
            rendered.props.children.props.title,
            'This is the user id.'
        );
    });

    it('should handle onClick', () => {
        const onHeaderClick = stub();
        const columnIndex = 1;
        const column = fixtures.columns[columnIndex];
        const component = TestUtils.createComponent(
            <Header
            column={column}
            columnIndex={columnIndex}
            onHeaderClick={onHeaderClick} />
        );

        stub(component, 'setState');

        component.onClick('mock evt');
        assert.equal(onHeaderClick.callCount, 1);
        assert.equal(component.setState.callCount, 1);
        assert.isTrue(onHeaderClick.calledWith(
            'mock evt',
            column,
            columnIndex,
            undefined,
            undefined,
            1
        ));
        assert.isTrue(component.setState.calledWith({numClicks: 1}));

        component.setState.restore();
    });

    it('should get special class names', () => {
        const columnIndex = 0;
        const column = fixtures.columns[columnIndex];
        const component = TestUtils.createComponent(
            <Header
            activeHeader={0}
            column={column}
            columnIndex={columnIndex} />
        );

        assert.equal(
            component.getClassName(),
            'react-ui-grid-header react-ui-grid-header-active'
        );
    });
});
