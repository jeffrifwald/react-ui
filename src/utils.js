export function classNames(...args) {
    return (
        typeof args[0] === 'object' ?
        Object.keys(args[0]).filter((key) => args[0][key]) :
        args
    ).join(' ');
}

export function getClassName(cls, ...args) {
    const classNameConfig = {
        [cls]: true
    };

    args.forEach((arg) => classNameConfig[arg] = arg);

    return classNames(classNameConfig);
}

export function noop() {

}

export const request = {
    post(url, data, cb) {
        const req = new global.XMLHttpRequest();

        req.onload = () => (
            req.status > 199 && req.status < 400 ?
            cb(undefined, req) :
            cb(new Error('ReactUI.AjaxForm: Status Error'), req)
        );
        req.onerror = () => cb(
            new Error('ReactUI.AjaxForm: Network Error'),
            req
        );
        req.open('POST', url, true);
        req.send(data);
    }
};

export const TestUtils = {
    createComponent(cls) {
        const Component = cls.type;

        return new Component(
            cls.props,
            cls._context //eslint-disable-line
        );
    }
};