import test from 'tape';

import classNames from '../src';


test('classNames - everything', (t) => {
    t.equal(classNames('cool', 55, [
        false,
        'neat',
        {fleek: true}
    ], false, {
        awesome: true,
        'not-cool': false,
        'very-cool': true
    }), 'cool 55 neat fleek awesome very-cool');

    t.end();
});

test('classNames - strings', (t) => {
    t.equal(classNames(''), '');
    t.equal(
        classNames('cool', 'quite-cool', '', 'very-cool'),
        'cool quite-cool very-cool'
    );

    t.end();
});

test('classNames - numbers', (t) => {
    t.equal(classNames(0, 1, 2, 3), '0 1 2 3');

    t.end();
});

test('classNames - array', (t) => {
    t.equal(classNames([]), '');
    t.equal(
        classNames(['cool', 'quite-cool', 'very-cool'], ['extra-cool']),
        'cool quite-cool very-cool extra-cool'
    );

    t.end();
});

test('classNames - object', (t) => {
    t.equal(classNames({}), '');
    t.equal(
        classNames({
            cool: true,
            uncool: false,
            'very-cool': true,
            lame: 0,
            dumb: null,
            bad: undefined
        }),
        'cool very-cool'
    );

    t.end();
});

test('classNames - bad values', (t) => {
    t.equal(classNames(null), '');
    t.equal(classNames(undefined), '');
    t.equal(classNames(true), '');
    t.end();
});
