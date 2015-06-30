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

function onResultClick(evt, result) {
    alert(`Selected: ${result}`);
}

export default {
    code: [
        '<SearchBox',
        'onResultClick={onResultClick}',
        'parseResults={parseResults}',
        'placeholder="Type \'j\' to see results..."',
        'queryParam="query"',
        'url="http://httpbin.org/get" />'
    ].join('\n'),
    name: 'SearchBox',
    rendered: (
        <SearchBox
        onResultClick={onResultClick}
        parseResults={parseResults}
        placeholder="Type 'j' to see results..."
        queryParam="query"
        url="http://httpbin.org/get" />
    )
};
