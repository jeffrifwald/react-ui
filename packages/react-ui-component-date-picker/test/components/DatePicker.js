import {shallow} from 'enzyme';
import React from 'react';
import {stub} from 'sinon';
import test from 'tape';

import DatePicker from '../../src/components/DatePicker';


test('grid/components/DatePicker', (t) => {
    const wrapper = shallow(<DatePicker />);

    t.equal(wrapper.find('.react-ui-date-picker').length, 1);
    t.equal(wrapper.find('.react-ui-date-picker-wrapper').length, 1);

    t.end();
});

test('grid/components/DatePicker - open calendar', (t) => {
    const wrapper = shallow(<DatePicker defaultShowCalendar={true} />);

    t.equal(wrapper.find('.react-ui-date-picker-open').length, 1);
    t.equal(wrapper.find('.react-ui-date-picker-calendar').length, 1);

    t.end();
});

test('grid/components/DatePicker - disabled calendar', (t) => {
    const wrapper = shallow(<DatePicker disabled={true} />);

    t.equal(wrapper.find('.react-ui-date-picker-disabled').length, 1);

    t.end();
});

test('grid/components/DatePicker - default value', (t) => {
    const date = new Date(2016, 5, 4);
    const wrapper = shallow(
        <DatePicker
        defaultShowCalendar={true}
        defaultValue={date} />
    );

    t.equal(wrapper.find('.react-ui-date-picker-calendar-selected-day').length, 1);

    t.end();
});

test('grid/components/DatePicker - year and month selectors', (t) => {
    const wrapper = shallow(
        <DatePicker
        defaultShowCalendar={true}
        showMonthSelector={true}
        showYearSelector={true} />
    );

    t.equal(wrapper.find('.react-ui-date-picker-calendar-month-selector').length, 1);
    t.equal(wrapper.find('.react-ui-date-picker-calendar-year-selector').length, 1);

    t.end();
});

test('grid/components/DatePicker - disabled dates', (t) => {
    const isDateDisabled = () => true;
    const wrapper = shallow(
        <DatePicker
        defaultShowCalendar={true}
        isDateDisabled={isDateDisabled} />
    );

    t.equal(wrapper.find('.react-ui-date-picker-calendar-disabled-day').length > 1, true);

    t.end();
});

test('grid/components/DatePicker - click date', (t) => {
    const wrapper = shallow(
        <DatePicker
        defaultShowCalendar={true} />
    );
    const instance = wrapper.instance();
    const day = wrapper.find('.react-ui-date-picker-calendar-day').at(0);
    const mockEvt = {
        stopPropagation: stub()
    };

    stub(instance, 'onClickDate');

    day.simulate('click', mockEvt);
    t.equal(instance.onClickDate.callCount, 1);

    instance.onClickDate.restore();
    t.end();
});

test('grid/components/DatePicker.componentDidMount', (t) => {
    const instance = shallow(
        <DatePicker />
    ).instance();
    const globalDocument = global.document;

    global.document = {
        addEventListener: stub()
    };

    instance.componentDidMount();
    t.equal(global.document.addEventListener.callCount, 1);
    t.equal(global.document.addEventListener.calledWith(
        'click',
        instance.onClickDocument
    ), true);

    global.document = globalDocument;
    t.end();
});

test('grid/components/DatePicker.componentWillUnmount', (t) => {
    const instance = shallow(
        <DatePicker />
    ).instance();
    const globalDocument = global.document;

    global.document = {
        removeEventListener: stub()
    };

    instance.componentWillUnmount();
    t.equal(global.document.removeEventListener.callCount, 1);
    t.equal(global.document.removeEventListener.calledWith(
        'click',
        instance.onClickDocument
    ), true);

    global.document = globalDocument;
    t.end();
});

test('grid/components/DatePicker.clear', (t) => {
    const instance = shallow(
        <DatePicker />
    ).instance();

    stub(instance, 'setState');

    instance.clear();
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({value: undefined}), true);

    instance.setState.restore();
    t.end();
});

test('grid/components/DatePicker.showCalendar', (t) => {
    const instance = shallow(<DatePicker />).instance();

    stub(instance, 'setState');

    instance.state.showCalendar = false;
    instance.showCalendar();
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({showCalendar: true}), true);

    instance.state.showCalendar = true;
    instance.showCalendar();
    t.equal(instance.setState.callCount, 1);

    instance.setState.restore();
    t.end();
});

test('grid/components/DatePicker.hideCalendar', (t) => {
    const instance = shallow(<DatePicker />).instance();

    stub(instance, 'setState');

    instance.state.showCalendar = true;
    instance.hideCalendar();
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({showCalendar: false}), true);

    instance.state.showCalendar = false;
    instance.hideCalendar();
    t.equal(instance.setState.callCount, 1);

    instance.setState.restore();
    t.end();
});

test('grid/components/DatePicker.toggleCalendar', (t) => {
    const instance = shallow(<DatePicker />).instance();

    stub(instance, 'setState');

    instance.state.showCalendar = true;
    instance.toggleCalendar();
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({showCalendar: false}), true);

    instance.state.showCalendar = false;
    instance.toggleCalendar();
    t.equal(instance.setState.callCount, 2);
    t.equal(instance.setState.calledWith({showCalendar: true}), true);

    instance.setState.restore();
    t.end();
});

test('grid/components/DatePicker.onChangeMonth', (t) => {
    const instance = shallow(<DatePicker />).instance();
    const mockEvt = {
        stopPropagation: stub(),
        target: {
            options: [{
                value: 3
            }],
            selectedIndex: 0
        }
    };

    stub(instance, 'setState');

    instance.state.selectedMonth = new Date(2016, 5, 5);
    instance.onChangeMonth(mockEvt);
    t.equal(mockEvt.stopPropagation.callCount, 1);
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({
        selectedMonth: new Date(2016, 3, 1)
    }), true);

    instance.setState.restore();
    t.end();
});

test('grid/components/DatePicker.onChangeYear', (t) => {
    const instance = shallow(<DatePicker />).instance();
    const mockEvt = {
        stopPropagation: stub(),
        target: {
            options: [{
                value: 1995
            }],
            selectedIndex: 0
        }
    };

    stub(instance, 'setState');

    instance.state.selectedMonth = new Date(2016, 5, 5);
    instance.onChangeYear(mockEvt);
    t.equal(mockEvt.stopPropagation.callCount, 1);
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({
        selectedMonth: new Date(1995, 5, 1)
    }), true);

    instance.setState.restore();
    t.end();
});

test('grid/components/DatePicker.onClick', (t) => {
    const instance = shallow(<DatePicker />).instance();

    stub(instance, 'toggleCalendar');

    instance.onClick();
    t.equal(instance.toggleCalendar.callCount, 1);

    instance.toggleCalendar.restore();
    t.end();
});

test('grid/components/DatePicker.onClick - disabled', (t) => {
    const instance = shallow(<DatePicker disabled={true} />).instance();

    stub(instance, 'toggleCalendar');

    instance.onClick();
    t.equal(instance.toggleCalendar.callCount, 0);

    instance.toggleCalendar.restore();
    t.end();
});

test('grid/components/DatePicker.onClickClear', (t) => {
    const instance = shallow(<DatePicker />).instance();
    const mockEvt = {stopPropagation: stub()};

    stub(instance, 'clear');

    instance.onClickClear(mockEvt);
    t.equal(instance.clear.callCount, 1);
    t.equal(mockEvt.stopPropagation.callCount, 1);

    instance.clear.restore();
    t.end();
});

test('grid/components/DatePicker.onClickDate', (t) => {
    const instance = shallow(<DatePicker />).instance();
    const mockEvt = {stopPropagation: stub()};
    const date = new Date(2016, 4, 4);

    stub(instance, 'setState', (state, cb) => {
        cb();

        t.equal(mockEvt.stopPropagation.callCount, 1);
        t.equal(instance.setState.callCount, 1);
        t.deepEqual(state, {
            selectedMonth: new Date(2016, 4, 1),
            showCalendar: false,
            value: date
        });

        instance.setState.restore();
        t.end();
    });

    instance.onClickDate(mockEvt, date, false);
});

test('grid/components/DatePicker.onClickDate - disabled', (t) => {
    const instance = shallow(<DatePicker />).instance();
    const mockEvt = {stopPropagation: stub()};
    const date = new Date(2016, 4, 4);

    stub(instance, 'setState');

    instance.onClickDate(mockEvt, date, true);
    t.equal(mockEvt.stopPropagation.callCount, 1);
    t.equal(instance.setState.callCount, 0);

    instance.setState.restore();
    t.end();
});

test('grid/components/DatePicker.onClickDocument', (t) => {
    const instance = shallow(<DatePicker />).instance();
    const mockEvt = {target: 'mock target'};

    stub(instance, 'showCalendar');
    stub(instance, 'hideCalendar');

    instance.refs = {
        datePicker: {
            contains(target) {
                t.equal(target, 'mock target');

                return true;
            }
        }
    };
    instance.onClickDocument(mockEvt);
    t.equal(instance.showCalendar.callCount, 1);
    t.equal(instance.hideCalendar.callCount, 0);

    instance.refs = {
        datePicker: {
            contains(target) {
                t.equal(target, 'mock target');

                return false;
            }
        }
    };
    instance.onClickDocument(mockEvt);
    t.equal(instance.showCalendar.callCount, 1);
    t.equal(instance.hideCalendar.callCount, 1);

    instance.showCalendar.restore();
    instance.hideCalendar.restore();
    t.end();
});

test('grid/components/DatePicker.onClickNext', (t) => {
    const instance = shallow(<DatePicker />).instance();
    const mockEvt = {stopPropagation: stub()};

    stub(instance, 'setState');

    instance.state.selectedMonth = new Date(2016, 2, 1);
    instance.onClickNext(mockEvt);
    t.equal(mockEvt.stopPropagation.callCount, 1);
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({
        selectedMonth: new Date(2016, 3, 1)
    }), true);

    instance.setState.restore();
    t.end();
});

test('grid/components/DatePicker.onClickPrevious', (t) => {
    const instance = shallow(<DatePicker />).instance();
    const mockEvt = {stopPropagation: stub()};

    stub(instance, 'setState');

    instance.state.selectedMonth = new Date(2016, 2, 1);
    instance.onClickPrevious(mockEvt);
    t.equal(mockEvt.stopPropagation.callCount, 1);
    t.equal(instance.setState.callCount, 1);
    t.equal(instance.setState.calledWith({
        selectedMonth: new Date(2016, 1, 1)
    }), true);

    instance.setState.restore();
    t.end();
});
