import FileInput from '../../../../packages/react-ui-component-file-input';


export default {
    code: [
        '<FileInput',
        'chooseText="Choose"',
        'clearText="Remove"',
        'placeholder="Upload a file..."',
        'name="photo" />'
    ].join('\n'),
    name: 'FileInput',
    rendered: (
        <FileInput
        chooseText="Choose"
        clearText="Remove"
        placeholder="Upload a file..."
        name="photo" />
    )
};
