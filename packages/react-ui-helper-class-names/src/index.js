function classNames(...args) {
    const classes = [];

    args.forEach((arg) => {
        if (!arg && arg !== 0) {
            return;
        }

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames(...arg));
        } else if (argType === 'object') {
            for (const prop in arg) {
                if (arg.hasOwnProperty(prop) && arg[prop]) {
                    classes.push(prop);
                }
            }
        }
    });

    return classes.join(' ');
}

module.exports = classNames;
