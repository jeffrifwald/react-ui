import fs from 'fs';

import ReactUI from './src';


const IGNORE_KEYS = ['version'];
const components = Object.keys(ReactUI).filter(
    (key) => IGNORE_KEYS.indexOf(key) === -1
);

components.push('index');
components.forEach((component) => {
    fs.writeFile(`${component}.js`, [
        `import ${component} from './src/${component}';`,
        '',
        '',
        `export default ${component};`
    ].join('\n'));
});
