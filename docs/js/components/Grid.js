import Grid from '../../../src/Grid';


const data = [{
    championships: 2,
    name: {
        first: 'Lebron',
        last: 'James'
    },
    team: 'Cavaliers'
}, {
    championships: 6,
    name: {
        first: 'Michael',
        last: 'Jordan'
    },
    team: 'Bulls'
}, {
    championships: 5,
    name: {
        first: 'Magic',
        last: 'Johnson'
    },
    team: 'Lakers'
}, {
    championships: 3,
    name: {
        first: 'Larry',
        last: 'Bird'
    },
    team: 'Celtics'
}];

const columns = [{
    dataProp: 'name',
    name: 'Name',
    render(record) {
        return (
            <span>
                {record.name.first} {record.name.last}
            </span>
        );
    },
    sorter(a, b) {
        const aName = a.name.last.toLowerCase();
        const bName = b.name.last.toLowerCase();

        if (aName < bName) {
            return -1;
        }

        if (aName > bName) {
            return 1;
        }

        return 0;
    }
}, {
    dataProp: 'team',
    name: 'Team',
    sorter(a, b) {
        const aTeam = a.team.toLowerCase();
        const bTeam = b.team.toLowerCase();

        if (aTeam < bTeam) {
            return -1;
        }

        if (aTeam > bTeam) {
            return 1;
        }

        return 0;
    }
}, {
    dataProp: 'championships',
    name: 'NBA Championships',
    sorter(a, b) {
        return b.championships - a.championships;
    }
}];

function sortColumn(evt, column, columnIndex, rowIndex, record, numClicks) {
    data.sort(column.sorter);

    if (numClicks % 2 === 0) {
        data.reverse();
    }
}

export default {
    code: [
        '<Grid',
        'columns={columns}',
        'data={data}',
        'onHeaderClick={sortColumn} />'
    ].join('\n'),
    name: 'Grid',
    rendered: (
        <Grid
        columns={columns}
        data={data}
        onHeaderClick={sortColumn} />
    )
};
