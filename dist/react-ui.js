(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcReactUI = require('./src/ReactUI');

var _srcReactUI2 = _interopRequireDefault(_srcReactUI);

global.ReactUI = _srcReactUI2['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./src/ReactUI":12}],2:[function(require,module,exports){
module.exports={
  "name": "react-ui",
  "version": "0.4.0",
  "author": "Ambition Team",
  "license": "MIT",
  "description": "A collection of components for React.",
  "repository": {
    "type": "git",
    "url": "git://github.com/ambitioninc/react-ui.git"
  },
  "bugs": {
    "url": "https://github.com/ambitioninc/react-ui/issues"
  },
  "homepage": "https://github.com/ambitioninc/react-ui",
  "scripts": {
    "build": "npm run build_dist && npm run build_docs",
    "build_dist": "browserify dist.js -o dist/react-ui.js --no-bundle-external && uglifyjs dist/react-ui.js -o dist/react-ui.min.js && stylus src/style --out dist --use nib && cleancss dist/react-ui.css -o dist/react-ui.min.css",
    "build_docs": "browserify docs/src/index.js | uglifyjs -o static/js/index.min.js && stylus docs/style/index.styl --out static/css --use nib && cp node_modules/react/dist/react.min.js static/js/react.min.js",
    "cover": "babel-node node_modules/.bin/babel-istanbul cover _mocha -- --recursive src",
    "lint": "eslint src",
    "test": "npm run lint && npm run cover",
    "watch_style": "stylus --watch src/style --out dist --use nib"
  },
  "devDependencies": {
    "babel": "^5.6.7",
    "babel-core": "^5.6.7",
    "babel-istanbul": "^0.2.8",
    "babel-runtime": "^5.6.7",
    "babelify": "^6.1.2",
    "browserify": "^10.2.4",
    "browserify-shim": "^3.8.9",
    "chai": "^3.0.0",
    "clean-css": "^3.3.4",
    "eslint": "^0.23.0",
    "eslint-plugin-react": "^2.5.2",
    "mocha": "^2.2.5",
    "nib": "^1.1.0",
    "sinon": "^1.15.3",
    "stylus": "^0.51.1",
    "uglify-js": "^2.4.23"
  },
  "dependencies": {
    "react": "^0.13.3"
  },
  "browserify": {
    "transform": [
      "babelify",
      "browserify-shim"
    ]
  },
  "browserify-shim": {
    "react": "global:React"
  }
}

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

/**
 * @class AjaxForm
 * A form that submits its contents with an
 * asynchronous POST request via FormData. Falls back to synchronously
 * submitting the form when FormData does not exist.
 */

var AjaxForm = (function (_React$Component) {
    function AjaxForm() {
        _classCallCheck(this, AjaxForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(AjaxForm.prototype), 'constructor', this).apply(this, args);

        this.onResponse = this.onResponse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    _inherits(AjaxForm, _React$Component);

    _createClass(AjaxForm, [{
        key: 'render',
        value: function render() {
            var className = (0, _utils.getClassName)('react-ui-ajax-form', this.props.className);

            return _react2['default'].createElement(
                'form',
                {
                    action: this.props.action,
                    className: className,
                    method: 'POST',
                    onSubmit: this.onSubmit,
                    ref: 'form' },
                this.props.children
            );
        }
    }, {
        key: 'onResponse',
        value: function onResponse(err, res) {
            this.props.onResponse(err, res);
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(evt) {
            evt.preventDefault();
            this.props.onSubmit(evt);
            this.submit();
        }
    }, {
        key: 'submit',
        value: function submit() {
            var form = _react2['default'].findDOMNode(this.refs.form);

            if (global.FormData) {
                this.submitFormData(form);
            } else {
                form.submit();
            }
        }
    }, {
        key: 'submitFormData',
        value: function submitFormData(form) {
            _utils.request.post(form.action, new global.FormData(form), this.onResponse);
        }
    }]);

    return AjaxForm;
})(_react2['default'].Component);

AjaxForm.propTypes = {
    action: _react2['default'].PropTypes.string,
    className: _react2['default'].PropTypes.string,
    onResponse: _react2['default'].PropTypes.func,
    onSubmit: _react2['default'].PropTypes.func
};

AjaxForm.defaultProps = {
    action: '',
    onResponse: _utils.noop,
    onSubmit: _utils.noop
};

exports['default'] = AjaxForm;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils":15}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsAjaxForm = require('./components/AjaxForm');

var _componentsAjaxForm2 = _interopRequireDefault(_componentsAjaxForm);

exports['default'] = _componentsAjaxForm2['default'];
module.exports = exports['default'];

},{"./components/AjaxForm":3}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

/**
 * @class FileInput
 * A file input that can easily be styled. Uses a hidden file input
 * and exposes stylable visible inputs.
 */

var FileInput = (function (_React$Component) {
    function FileInput() {
        _classCallCheck(this, FileInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(FileInput.prototype), 'constructor', this).apply(this, args);

        this.state = { inputDisplay: '', inputKey: 0 };
        this.onChange = this.onChange.bind(this);
        this.onChooseClick = this.onChooseClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
    }

    _inherits(FileInput, _React$Component);

    _createClass(FileInput, [{
        key: 'render',
        value: function render() {
            var className = (0, _utils.getClassName)('react-ui-file-input', this.props.className);

            return _react2['default'].createElement(
                'div',
                { className: className },
                this.renderHiddenInput(),
                this.renderChooseButton(),
                this.renderClearButton(),
                this.renderInput()
            );
        }
    }, {
        key: 'renderHiddenInput',
        value: function renderHiddenInput() {
            var style = { display: 'none' };

            return _react2['default'].createElement('input', {
                disabled: this.props.disabled,
                key: this.state.inputKey,
                name: this.props.name,
                onChange: this.onChange,
                ref: 'fileInput',
                style: style,
                type: 'file' });
        }
    }, {
        key: 'renderChooseButton',
        value: function renderChooseButton() {
            var className = (0, _utils.getClassName)('react-ui-file-input-choose', this.props.chooseClassName);

            return this.props.showChooseButton ? _react2['default'].createElement(
                'button',
                {
                    className: className,
                    disabled: this.props.disabled,
                    onClick: this.onChooseClick,
                    type: 'button' },
                this.props.chooseText
            ) : null;
        }
    }, {
        key: 'renderClearButton',
        value: function renderClearButton() {
            var className = (0, _utils.getClassName)('react-ui-file-input-clear', this.props.clearClassName);

            return this.props.showClearButton ? _react2['default'].createElement(
                'button',
                {
                    className: className,
                    disabled: this.props.disabled,
                    onClick: this.onClearClick,
                    type: 'button' },
                this.props.clearText
            ) : null;
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var className = (0, _utils.getClassName)('react-ui-file-input-input', this.props.inputClassName);

            return this.props.showInput ? _react2['default'].createElement('input', {
                className: className,
                disabled: this.props.disabled,
                onClick: this.onChooseClick,
                placeholder: this.props.placeholder,
                readOnly: true,
                type: 'text',
                value: this.state.inputDisplay }) : null;
        }
    }, {
        key: 'onChange',
        value: function onChange(evt) {
            var inputDisplay = evt.target.value.split('\\').pop();

            this.props.onChange(evt, inputDisplay);
            this.setState({ inputDisplay: inputDisplay });
        }
    }, {
        key: 'onChooseClick',
        value: function onChooseClick(evt) {
            evt.preventDefault();
            this.props.onChooseClick(evt);
            _react2['default'].findDOMNode(this.refs.fileInput).click();
        }
    }, {
        key: 'onClearClick',
        value: function onClearClick(evt) {
            evt.preventDefault();
            this.props.onClearClick(evt);
            this.clear();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.setState({
                inputDisplay: '',
                inputKey: this.state.inputKey + 1
            });
        }
    }]);

    return FileInput;
})(_react2['default'].Component);

FileInput.propTypes = {
    chooseClassName: _react2['default'].PropTypes.string,
    chooseText: _react2['default'].PropTypes.string,
    className: _react2['default'].PropTypes.string,
    clearClassName: _react2['default'].PropTypes.string,
    clearText: _react2['default'].PropTypes.string,
    inputClassName: _react2['default'].PropTypes.string,
    name: _react2['default'].PropTypes.string,
    onChange: _react2['default'].PropTypes.func,
    onChooseClick: _react2['default'].PropTypes.func,
    onClearClick: _react2['default'].PropTypes.func,
    placeholder: _react2['default'].PropTypes.string
};

FileInput.defaultProps = {
    chooseText: 'Choose File',
    clearText: 'Clear File',
    onChange: _utils.noop,
    onChooseClick: _utils.noop,
    onClearClick: _utils.noop,
    showChooseButton: true,
    showClearButton: true,
    showInput: true
};

exports['default'] = FileInput;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils":15}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsFileInput = require('./components/FileInput');

var _componentsFileInput2 = _interopRequireDefault(_componentsFileInput);

exports['default'] = _componentsFileInput2['default'];
module.exports = exports['default'];

},{"./components/FileInput":5}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

var Cell = (function (_React$Component) {
    function Cell() {
        _classCallCheck(this, Cell);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(Cell.prototype), 'constructor', this).apply(this, args);

        this.state = { numClicks: 0 };
        this.onClick = this.onClick.bind(this);
    }

    _inherits(Cell, _React$Component);

    _createClass(Cell, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'td',
                {
                    className: this.getClassName(),
                    onClick: this.onClick },
                this.renderData()
            );
        }
    }, {
        key: 'renderData',
        value: function renderData() {
            return typeof this.props.column.render === 'function' ? this.props.column.render(this.props.record) : this.props.record[this.props.column.dataProp];
        }
    }, {
        key: 'onClick',
        value: function onClick(evt) {
            this.props.onCellClick(evt, this.props.column, this.props.columnIndex, this.props.rowIndex, this.props.record, this.state.numClicks + 1);

            this.setState({ numClicks: this.state.numClicks + 1 });
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            return (0, _utils.getClassName)('react-ui-grid-cell', this.props.cellClassName, this.getIsActive() ? (0, _utils.getClassName)('react-ui-grid-cell-active', this.props.activeCellClassName) : null);
        }
    }, {
        key: 'getIsActive',
        value: function getIsActive() {
            return this.props.columnIndex === this.props.activeCell[0] && this.props.rowIndex === this.props.activeCell[1];
        }
    }]);

    return Cell;
})(_react2['default'].Component);

exports['default'] = Cell;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils":15}],8:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _utils = require('../../utils');

var Grid = (function (_React$Component) {
    function Grid() {
        _classCallCheck(this, Grid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(Grid.prototype), 'constructor', this).apply(this, args);

        this.state = {
            activeCell: [-1, -1],
            activeHeader: -1,
            activeRow: -1
        };

        this.onCellClick = this.onCellClick.bind(this);
        this.onHeaderClick = this.onHeaderClick.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }

    _inherits(Grid, _React$Component);

    _createClass(Grid, [{
        key: 'render',
        value: function render() {
            var className = (0, _utils.getClassName)('react-ui-grid', this.props.className);

            return _react2['default'].createElement(
                'table',
                { className: className },
                this.renderHeaders(),
                this.renderRows()
            );
        }
    }, {
        key: 'renderHeaders',
        value: function renderHeaders() {
            var _this = this;

            var className = (0, _utils.getClassName)('react-ui-grid-row', this.props.rowClassName);
            var headers = this.props.columns.map(function (column, i) {
                return _react2['default'].createElement(_Header2['default'], _extends({}, _this.props, _this.state, {
                    column: column,
                    columnIndex: i,
                    key: i,
                    onHeaderClick: _this.onHeaderClick }));
            });

            return _react2['default'].createElement(
                'thead',
                null,
                _react2['default'].createElement(
                    'tr',
                    { className: className },
                    headers
                )
            );
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var _this2 = this;

            var rows = this.props.data.map(function (record, i) {
                return _react2['default'].createElement(_Row2['default'], _extends({}, _this2.props, _this2.state, {
                    key: i,
                    onCellClick: _this2.onCellClick,
                    onRowClick: _this2.onRowClick,
                    record: record,
                    rowIndex: i }));
            });

            return _react2['default'].createElement(
                'tbody',
                null,
                rows
            );
        }
    }, {
        key: 'onCellClick',
        value: function onCellClick() {
            var _props;

            (_props = this.props).onCellClick.apply(_props, arguments);
            this.setState({ activeCell: [arguments[2], arguments[3]] });
        }
    }, {
        key: 'onHeaderClick',
        value: function onHeaderClick() {
            var _props2;

            (_props2 = this.props).onHeaderClick.apply(_props2, arguments);
            this.setState({ activeHeader: arguments[2] });
        }
    }, {
        key: 'onRowClick',
        value: function onRowClick() {
            var _props3;

            (_props3 = this.props).onRowClick.apply(_props3, arguments);
            this.setState({ activeRow: arguments[3] });
        }
    }]);

    return Grid;
})(_react2['default'].Component);

Grid.propTypes = {
    activeCellClassName: _react2['default'].PropTypes.string,
    activeColumnClassName: _react2['default'].PropTypes.string,
    activeHeaderClassName: _react2['default'].PropTypes.string,
    activeRowClassName: _react2['default'].PropTypes.string,
    cellClassName: _react2['default'].PropTypes.string,
    className: _react2['default'].PropTypes.string,
    columns: _react2['default'].PropTypes.array.isRequired,
    data: _react2['default'].PropTypes.array.isRequired,
    headerClassName: _react2['default'].PropTypes.string,
    onCellClick: _react2['default'].PropTypes.func,
    onHeaderClick: _react2['default'].PropTypes.func,
    onRowClick: _react2['default'].PropTypes.func,
    rowClassName: _react2['default'].PropTypes.string
};

Grid.defaultProps = {
    columns: [],
    data: [],
    onCellClick: _utils.noop,
    onHeaderClick: _utils.noop,
    onRowClick: _utils.noop
};

exports['default'] = Grid;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils":15,"./Header":9,"./Row":10}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

var Header = (function (_React$Component) {
    function Header() {
        _classCallCheck(this, Header);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, args);

        this.state = { numClicks: 0 };
        this.onClick = this.onClick.bind(this);
    }

    _inherits(Header, _React$Component);

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'th',
                { className: this.getClassName(), onClick: this.onClick },
                _react2['default'].createElement(
                    'span',
                    { title: this.props.column.nameTooltip },
                    this.props.column.name
                )
            );
        }
    }, {
        key: 'onClick',
        value: function onClick(evt) {
            this.props.onHeaderClick(evt, this.props.column, this.props.columnIndex, undefined, undefined, this.state.numClicks + 1);

            this.setState({ numClicks: this.state.numClicks + 1 });
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            return (0, _utils.getClassName)('react-ui-grid-header', this.props.headerClassName, this.getIsActive() ? (0, _utils.getClassName)('react-ui-grid-header-active', this.props.activeHeaderClassName) : null);
        }
    }, {
        key: 'getIsActive',
        value: function getIsActive() {
            return this.props.columnIndex === this.props.activeHeader;
        }
    }]);

    return Header;
})(_react2['default'].Component);

exports['default'] = Header;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils":15}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var _react2 = _interopRequireDefault(_react);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _utils = require('../../utils');

var Row = (function (_React$Component) {
    function Row() {
        _classCallCheck(this, Row);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(Row.prototype), 'constructor', this).apply(this, args);

        this.state = { numClicks: 0 };
        this.onClick = this.onClick.bind(this);
    }

    _inherits(Row, _React$Component);

    _createClass(Row, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'tr',
                {
                    className: this.getClassName(),
                    onClick: this.onClick },
                this.renderCells()
            );
        }
    }, {
        key: 'renderCells',
        value: function renderCells() {
            var _this = this;

            return this.props.columns.map(function (column, i) {
                return _react2['default'].createElement(_Cell2['default'], _extends({}, _this.props, {
                    column: column,
                    columnIndex: i,
                    key: i }));
            });
        }
    }, {
        key: 'onClick',
        value: function onClick(evt) {
            this.props.onRowClick(evt, undefined, undefined, this.props.rowIndex, undefined, this.state.numClicks + 1);

            this.setState({ numClicks: this.state.numClicks + 1 });
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            return (0, _utils.getClassName)('react-ui-grid-row', this.props.headerClassName, this.getIsActive() ? (0, _utils.getClassName)('react-ui-grid-row-active', this.props.activeRowClassName) : null);
        }
    }, {
        key: 'getIsActive',
        value: function getIsActive() {
            return this.props.rowIndex === this.props.activeRow;
        }
    }]);

    return Row;
})(_react2['default'].Component);

exports['default'] = Row;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils":15,"./Cell":7}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsGrid = require('./components/Grid');

var _componentsGrid2 = _interopRequireDefault(_componentsGrid);

exports['default'] = _componentsGrid2['default'];
module.exports = exports['default'];

},{"./components/Grid":8}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _packageJson = require('../package.json');

var _AjaxForm = require('./AjaxForm');

var _AjaxForm2 = _interopRequireDefault(_AjaxForm);

var _FileInput = require('./FileInput');

var _FileInput2 = _interopRequireDefault(_FileInput);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _SearchBox = require('./SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

exports['default'] = {
    AjaxForm: _AjaxForm2['default'],
    FileInput: _FileInput2['default'],
    Grid: _Grid2['default'],
    SearchBox: _SearchBox2['default'],
    version: _packageJson.version
};
module.exports = exports['default'];

},{"../package.json":2,"./AjaxForm":4,"./FileInput":6,"./Grid":11,"./SearchBox":14}],13:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

var SearchBox = (function (_React$Component) {
    function SearchBox() {
        _classCallCheck(this, SearchBox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(SearchBox.prototype), 'constructor', this).apply(this, args);

        this.state = {
            showDropDown: false,
            results: []
        };
        this.onResponse = this.onResponse.bind(this);
        this.onDropDownClick = this.onDropDownClick.bind(this);
        this.delayBlur = (0, _utils.debounce)(this.onBlur.bind(this), _utils.BLUR_DELAY_MS);
        this.delaySearch = (0, _utils.debounce)(this.onSearch.bind(this), this.props.delay);
    }

    _inherits(SearchBox, _React$Component);

    _createClass(SearchBox, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.delayBlur.cancel();
            this.delaySearch.cancel();
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _utils.getClassName)('react-ui-search-box', this.props.className);

            return _react2['default'].createElement(
                'div',
                { className: className },
                _react2['default'].createElement('input', {
                    onBlur: this.delayBlur,
                    onChange: this.delaySearch,
                    placeholder: this.props.placeholder,
                    ref: 'search',
                    type: 'text' }),
                this.renderDropDown()
            );
        }
    }, {
        key: 'renderDropDown',
        value: function renderDropDown() {
            var _this = this;

            if (!this.state.showDropDown) {
                return null;
            }

            var dropDownClassName = (0, _utils.getClassName)('react-ui-search-box-drop-down', this.props.resultsWapperClassName);
            var resultClassName = (0, _utils.getClassName)('react-ui-search-box-result', this.props.resultClassName);
            var results = (this.state.results || []).map(function (result, i) {
                return _react2['default'].createElement(
                    'div',
                    {
                        className: resultClassName,
                        key: i,
                        onClick: _this.onResultClick.bind(_this, result) },
                    _this.props.renderResult(result)
                );
            });

            return _react2['default'].createElement(
                'div',
                {
                    className: dropDownClassName,
                    onClick: this.onDropDownClick },
                results
            );
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.hideDropDown();
        }
    }, {
        key: 'onResultClick',
        value: function onResultClick(result, evt) {
            this.delayBlur.cancel();
            this.props.onResultClick(evt, result);
            this.select(result);
            this.hideDropDown();
        }
    }, {
        key: 'onDropDownClick',
        value: function onDropDownClick(evt) {
            this.props.onDropDownClick(evt);
            this.delayBlur.cancel();
        }
    }, {
        key: 'onResponse',
        value: function onResponse(err, req) {
            var results = this.props.parseResults(req);

            this.props.onResponse(err, req, results);
            this.setState({
                results: results,
                showDropDown: true
            });
        }
    }, {
        key: 'onSearch',
        value: function onSearch(evt) {
            var value = _react2['default'].findDOMNode(this.refs.search).value;
            var url = this.getUrl(value);

            if (value) {
                this.props.onSearch(evt, url);
                _utils.request.get(url, this.onResponse);
            } else {
                this.hideDropDown();
            }
        }
    }, {
        key: 'getUrl',
        value: function getUrl(query) {
            return this.props.queryParam ? this.props.url + '?' + this.props.queryParam + '=' + query : this.props.url;
        }
    }, {
        key: 'select',
        value: function select(result) {
            this.setState({ value: result });
        }
    }, {
        key: 'hideDropDown',
        value: function hideDropDown() {
            this.setState({ showDropDown: false });
        }
    }, {
        key: 'showDropDown',
        value: function showDropDown() {
            this.setState({ showDropDown: true });
        }
    }]);

    return SearchBox;
})(_react2['default'].Component);

SearchBox.propTypes = {
    className: _react2['default'].PropTypes.string,
    delay: _react2['default'].PropTypes.number,
    dropDownClassName: _react2['default'].PropTypes.string,
    name: _react2['default'].PropTypes.string,
    onResponse: _react2['default'].PropTypes.func,
    onResultClick: _react2['default'].PropTypes.func,
    onSearch: _react2['default'].PropTypes.func,
    placeholder: _react2['default'].PropTypes.string,
    resultClassName: _react2['default'].PropTypes.string,
    renderResult: _react2['default'].PropTypes.func,
    url: _react2['default'].PropTypes.string
};

SearchBox.defaultProps = {
    delay: 400,
    onDropDownClick: _utils.noop,
    onResultClick: _utils.noop,
    onResponse: _utils.noop,
    onSearch: _utils.noop,
    placeholder: '',
    parseResults: function parseResults(req) {
        return req;
    },
    renderResult: function renderResult(result) {
        return result;
    }
};

exports['default'] = SearchBox;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils":15}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsSearchBox = require('./components/SearchBox');

var _componentsSearchBox2 = _interopRequireDefault(_componentsSearchBox);

exports['default'] = _componentsSearchBox2['default'];
module.exports = exports['default'];

},{"./components/SearchBox":13}],15:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.classNames = classNames;
exports.debounce = debounce;
exports.getClassName = getClassName;
exports.noop = noop;

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

function classNames() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return (typeof args[0] === 'object' ? Object.keys(args[0]).filter(function (key) {
        return args[0][key];
    }) : args).join(' ');
}

function debounce(fn, ms) {
    var debounced = {};

    debounced.fn = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        debounced.fn.cancel();
        debounced.timeout = setTimeout(function () {
            return fn.apply(undefined, args);
        }, ms);
    };
    debounced.fn.cancel = function () {
        return clearTimeout(debounced.timeout);
    };

    return debounced.fn;
}

function getClassName(cls) {
    var classNameConfig = _defineProperty({}, cls, true);

    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
    }

    args.forEach(function (arg) {
        return classNameConfig[arg] = arg;
    });

    return classNames(classNameConfig);
}

function noop() {}

var request = {
    post: function post(url, data, cb) {
        var req = new global.XMLHttpRequest();

        req.onload = function () {
            return req.status > 199 && req.status < 400 ? cb(undefined, req) : cb(new Error('POST: Status Error'), req);
        };
        req.onerror = function () {
            return cb(new Error('POST: Network Error'), req);
        };
        req.open('POST', url, true);
        req.send(data);
    },

    get: function get(url, cb) {
        var req = new global.XMLHttpRequest();

        req.onload = function () {
            return req.status > 199 && req.status < 400 ? cb(undefined, req) : cb(new Error('GET: Status Error'), req);
        };
        req.onerror = function () {
            return cb(new Error('GET: Network Error'), req);
        };
        req.open('GET', url, true);
        req.send();
    }
};

exports.request = request;
var BLUR_DELAY_MS = 100;

exports.BLUR_DELAY_MS = BLUR_DELAY_MS;
var TestUtils = {
    createComponent: function createComponent(cls) {
        var Component = cls.type;

        return new Component(cls.props, cls._context //eslint-disable-line
        );
    }
};
exports.TestUtils = TestUtils;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
