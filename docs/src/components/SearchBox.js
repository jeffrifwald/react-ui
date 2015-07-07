import SearchBox from '../../../src/SearchBox';


function parseResults(req) {
    const query = JSON.parse(req.responseText).args.query.toLowerCase();
    const results = [
        'John',
        'Jane',
        'Jim',
        'Jack',
        'Joe',
        'Jess',
        'Jill'
    ];

    return (
        results.filter(
            (x) => x.toLowerCase().includes(query)
        )
    );
}

function getUrl(query) {
    return `http://httpbin.org/get?query=${query}`;
}

function onChange(evt, result) {
    alert(`Selected: ${result}`);
}

export default {
    code: [
        '<SearchBox',
        'getUrl={getUrl}',
        'onChange={onChange}',
        'parseResults={parseResults}',
        'placeholder="Type \'j\' to see results..." />'
    ].join('\n'),
    name: 'SearchBox',
    rendered: (
        <SearchBox
        getUrl={getUrl}
        onChange={onChange}
        parseResults={parseResults}
        placeholder="Type 'j' to see results..." />
    )
};
