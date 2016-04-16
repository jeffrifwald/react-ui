import Grid from '../../../../packages/react-ui-component-grid';


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
    render(record) {
        return (
            <span>
                {record.name.first} {record.name.last}
            </span>
        );
    },
    getSortValue(record) {
        return record.name.last.toLowerCase();
    },
    header: 'Name'
}, {
    dataProp: 'team',
    getSortValue(record) {
        return record.team.toLowerCase();
    },
    header: 'Team'
}, {
    dataProp: 'championships',
    getSortValue(record) {
        return 0 - record.championships;
    },
    header: 'Championships'
}];

function onClickCell(evt, record, column) {
    if (column.dataProp === 'name') {
        alert(`Clicked ${record.name.first} ${record.name.last}`);
    } else {
        alert(`Clicked ${record[column.dataProp]}`);
    }
}

export default {
    code: [
        '<Grid',
        'columns={columns}',
        'data={data}',
        'onClickCell={onClickCell} />'
    ].join('\n'),
    name: 'Grid',
    rendered: (
        <Grid
        columns={columns}
        data={data}
        onClickCell={onClickCell} />
    )
};
