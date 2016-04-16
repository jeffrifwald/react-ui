/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _DocsApp = __webpack_require__(3);

	var _DocsApp2 = _interopRequireDefault(_DocsApp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactDom2.default.render(React.createElement(_DocsApp2.default, null), document.querySelector('.render'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Grid = __webpack_require__(5);

	var _Grid2 = _interopRequireDefault(_Grid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var examples = [_Grid2.default];

	var DocsApp = function (_React$Component) {
	    _inherits(DocsApp, _React$Component);

	    function DocsApp() {
	        _classCallCheck(this, DocsApp);

	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }

	    DocsApp.prototype.componentDidMount = function componentDidMount() {
	        hljs.initHighlightingOnLoad();
	    };

	    DocsApp.prototype.render = function render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'docs' },
	            this.renderHeader(),
	            this.renderBody()
	        );
	    };

	    DocsApp.prototype.renderHeader = function renderHeader() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'header' },
	            _react2.default.createElement(
	                'span',
	                { className: 'header-title' },
	                'ReactUI'
	            ),
	            _react2.default.createElement(
	                'span',
	                { className: 'header-version' },
	                'v1.x.x'
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'header-subtitle' },
	                _react2.default.createElement(
	                    'span',
	                    null,
	                    'A collection of components for '
	                ),
	                _react2.default.createElement(
	                    'a',
	                    { href: 'http://facebook.github.io/react/' },
	                    'React'
	                ),
	                '.'
	            )
	        );
	    };

	    DocsApp.prototype.renderBody = function renderBody() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'content' },
	            this.renderInstallation(),
	            this.renderExamples()
	        );
	    };

	    DocsApp.prototype.renderInstallation = function renderInstallation() {
	        var npmInstallCode = '$ npm install react-ui --save';
	        var browserInstallCode = '<script src="react-ui.js"></script>';

	        return _react2.default.createElement(
	            'div',
	            { className: 'installation' },
	            _react2.default.createElement(
	                'h2',
	                null,
	                'Installation'
	            ),
	            _react2.default.createElement(
	                'h3',
	                null,
	                'npm'
	            ),
	            _react2.default.createElement(
	                'pre',
	                null,
	                _react2.default.createElement(
	                    'code',
	                    { className: 'bash' },
	                    npmInstallCode
	                )
	            ),
	            _react2.default.createElement(
	                'h3',
	                null,
	                'browser'
	            ),
	            _react2.default.createElement(
	                'pre',
	                null,
	                _react2.default.createElement(
	                    'code',
	                    { className: 'bash' },
	                    browserInstallCode
	                )
	            )
	        );
	    };

	    DocsApp.prototype.renderExamples = function renderExamples() {
	        var renderedExamples = examples.map(function (example, i) {
	            return _react2.default.createElement(
	                'div',
	                { className: 'component', key: i },
	                _react2.default.createElement(
	                    'h3',
	                    null,
	                    example.name
	                ),
	                _react2.default.createElement(
	                    'pre',
	                    null,
	                    _react2.default.createElement(
	                        'code',
	                        null,
	                        example.code
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'component-container' },
	                    example.rendered
	                )
	            );
	        });

	        return _react2.default.createElement(
	            'div',
	            { className: 'components' },
	            _react2.default.createElement(
	                'h2',
	                null,
	                'Components'
	            ),
	            renderedExamples
	        );
	    };

	    return DocsApp;
	}(_react2.default.Component);

	exports.default = DocsApp;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _reactUiComponentGrid = __webpack_require__(6);

	var _reactUiComponentGrid2 = _interopRequireDefault(_reactUiComponentGrid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data = [{
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

	var columns = [{
	    dataProp: 'name',
	    render: function render(record) {
	        return React.createElement(
	            'span',
	            null,
	            record.name.first,
	            ' ',
	            record.name.last
	        );
	    },
	    getSortValue: function getSortValue(record) {
	        return record.name.last.toLowerCase();
	    },

	    header: 'Name'
	}, {
	    dataProp: 'team',
	    getSortValue: function getSortValue(record) {
	        return record.team.toLowerCase();
	    },

	    header: 'Team'
	}, {
	    dataProp: 'championships',
	    getSortValue: function getSortValue(record) {
	        return 0 - record.championships;
	    },

	    header: 'Championships'
	}];

	function onClickCell(evt, record, column) {
	    if (column.dataProp === 'name') {
	        alert('Clicked ' + record.name.first + ' ' + record.name.last);
	    } else {
	        alert('Clicked ' + record[column.dataProp]);
	    }
	}

	exports.default = {
	    code: ['<Grid', 'columns={columns}', 'data={data}', 'onClickCell={onClickCell} />'].join('\n'),
	    name: 'Grid',
	    rendered: React.createElement(_reactUiComponentGrid2.default, {
	        columns: columns,
	        data: data,
	        onClickCell: onClickCell })
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Grid = __webpack_require__(8);

	var _Grid2 = _interopRequireDefault(_Grid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Grid2.default;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _GridBody = __webpack_require__(9);

	var _GridBody2 = _interopRequireDefault(_GridBody);

	var _GridHeader = __webpack_require__(12);

	var _GridHeader2 = _interopRequireDefault(_GridHeader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var Grid = function (_React$Component) {
	    _inherits(Grid, _React$Component);

	    function Grid() {
	        _classCallCheck(this, Grid);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

	        _this.onClickCell = function (evt, record, column, rowIndex, columnIndex) {
	            _this.setState({
	                selectedCell: [rowIndex, columnIndex]
	            }, function () {
	                _this.props.onClickCell(evt, record, column, rowIndex, columnIndex);
	            });
	        };

	        _this.onClickHeader = function (evt, column, columnIndex, reverse) {
	            _this.perf.shouldSort = true;
	            _this.setState({
	                sortedColumn: columnIndex,
	                sortReverse: reverse
	            }, function () {
	                _this.props.onClickHeader(evt, column, columnIndex, reverse);
	            });
	        };

	        _this.state = {
	            selectedCell: _this.props.defaultSelectedCell,
	            sortedColumn: _this.props.defaultSortedColumn,
	            sortReverse: _this.props.defaultSortReverse
	        };
	        _this.perf = { shouldSort: true };
	        return _this;
	    }

	    Grid.prototype.render = function render() {
	        this.sortGridData();

	        return _react2.default.createElement(
	            'table',
	            { className: 'react-ui-grid' },
	            _react2.default.createElement(_GridHeader2.default, _extends({}, this.props, this.state, {
	                onClick: this.onClickHeader })),
	            _react2.default.createElement(_GridBody2.default, _extends({}, this.props, this.state, {
	                onClickCell: this.onClickCell,
	                onClickRow: this.onClickRow }))
	        );
	    };

	    Grid.prototype.sortGridData = function sortGridData() {
	        if (!this.shouldSort()) {
	            return;
	        }

	        var larger = this.state.sortReverse ? -1 : 1;
	        var smaller = this.state.sortReverse ? 1 : -1;
	        var sortGetter = this.getSortGetter();

	        this.perf.shouldSort = false;
	        this.props.data.sort(function (a, b) {
	            var aSortValue = sortGetter(a);
	            var bSortValue = sortGetter(b);

	            if (aSortValue > bSortValue) {
	                return larger;
	            }

	            if (aSortValue < bSortValue) {
	                return smaller;
	            }

	            return 0;
	        });
	    };

	    Grid.prototype.getSortGetter = function getSortGetter() {
	        var column = this.props.columns[this.state.sortedColumn];

	        if (typeof column.getSortValue === 'function') {
	            return column.getSortValue;
	        }

	        var propName = column.sortProp ? 'sortProp' : 'dataProp';

	        return function (record) {
	            return record && record[column[propName]];
	        };
	    };

	    Grid.prototype.shouldSort = function shouldSort() {
	        return this.perf.shouldSort && this.props.columns[this.state.sortedColumn];
	    };

	    return Grid;
	}(_react2.default.Component);

	Grid.propTypes = {
	    columns: _react2.default.PropTypes.array.isRequired,
	    data: _react2.default.PropTypes.array.isRequired,
	    defaultSelectedCell: _react2.default.PropTypes.array,
	    defaultSortedColumn: _react2.default.PropTypes.number,
	    defaultSortReverse: _react2.default.PropTypes.bool,
	    onClickCell: _react2.default.PropTypes.func,
	    onClickHeader: _react2.default.PropTypes.func
	};

	Grid.defaultProps = {
	    columns: [],
	    data: [],
	    defaultSelectedCell: [-1, -1],
	    defaultSortedColumn: -1,
	    defaultSortReverse: false,
	    onClickCell: function onClickCell() {},
	    onClickHeader: function onClickHeader() {}
	};

	exports.default = Grid;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.renderRecordValue = undefined;

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactUiHelperClassNames = __webpack_require__(10);

	var _reactUiHelperClassNames2 = _interopRequireDefault(_reactUiHelperClassNames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renderRecordValue = exports.renderRecordValue = function renderRecordValue(record, column, rowIndex, columnIndex) {
	    if (!record) {
	        return null;
	    }

	    if (typeof column.render === 'function') {
	        return column.render(record, column, rowIndex, columnIndex);
	    }

	    return record[column.dataProp];
	};

	var GridBody = function GridBody(props) {
	    var rows = props.data.map(function (record, rowIndex) {
	        var cells = props.columns.map(function (column, columnIndex) {
	            var onClickCell = function onClickCell(evt) {
	                return props.onClickCell(evt, record, column, rowIndex, columnIndex);
	            };
	            var cellClassName = (0, _reactUiHelperClassNames2.default)({
	                'react-ui-grid-cell': true,
	                'react-ui-grid-cell-selected': props.selectedCell[0] === rowIndex && props.selectedCell[1] === columnIndex
	            });

	            return _react2.default.createElement(
	                'td',
	                {
	                    className: cellClassName,
	                    key: columnIndex,
	                    onClick: onClickCell },
	                renderRecordValue(record, column, rowIndex, columnIndex)
	            );
	        });

	        return _react2.default.createElement(
	            'tr',
	            {
	                className: 'react-ui-grid-row',
	                key: rowIndex },
	            cells
	        );
	    });

	    return _react2.default.createElement(
	        'tbody',
	        null,
	        rows
	    );
	};

	GridBody.propTypes = {
	    data: _react2.default.PropTypes.array,
	    columns: _react2.default.PropTypes.array,
	    onClickCell: _react2.default.PropTypes.func,
	    selectedCell: _react2.default.PropTypes.array
	};

	GridBody.defaultProps = {
	    data: [],
	    columns: [],
	    onClickCell: function onClickCell() {},
	    selectedCell: [-1, -1]
	};

	exports.default = GridBody;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function classNames() {
	    var classes = [];

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    args.forEach(function (arg) {
	        if (!arg && arg !== 0) {
	            return;
	        }

	        var argType = typeof arg;

	        if (argType === 'string' || argType === 'number') {
	            classes.push(arg);
	        } else if (Array.isArray(arg)) {
	            classes.push(classNames.apply(undefined, _toConsumableArray(arg)));
	        } else if (argType === 'object') {
	            for (var prop in arg) {
	                if (arg.hasOwnProperty(prop) && arg[prop]) {
	                    classes.push(prop);
	                }
	            }
	        }
	    });

	    return classes.join(' ');
	}

	module.exports = classNames;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.renderColumnHeader = undefined;

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactUiHelperClassNames = __webpack_require__(10);

	var _reactUiHelperClassNames2 = _interopRequireDefault(_reactUiHelperClassNames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renderColumnHeader = exports.renderColumnHeader = function renderColumnHeader(column) {
	    if (typeof column.renderHeader === 'function') {
	        return column.renderHeader();
	    }

	    return column.header;
	};

	var GridHeader = function GridHeader(props) {
	    var headers = props.columns.map(function (column, i) {
	        var sorted = props.sortedColumn === i;
	        var reverse = props.sortReverse;
	        var nextReverse = sorted ? !reverse : false;
	        var sortedAsc = sorted && !reverse;
	        var sortedDsc = sorted && reverse;
	        var className = (0, _reactUiHelperClassNames2.default)({
	            'react-ui-grid-header': true,
	            'react-ui-grid-header-sorted-asc': sortedAsc,
	            'react-ui-grid-header-sorted-dsc': sortedDsc
	        });
	        var onClick = function onClick(evt) {
	            return props.onClick(evt, column, i, nextReverse);
	        };

	        return _react2.default.createElement(
	            'th',
	            {
	                className: className,
	                key: i,
	                onClick: onClick },
	            renderColumnHeader(column)
	        );
	    });

	    return _react2.default.createElement(
	        'thead',
	        null,
	        _react2.default.createElement(
	            'tr',
	            { className: 'react-ui-grid-row' },
	            headers
	        )
	    );
	};

	GridHeader.propTypes = {
	    columns: _react2.default.PropTypes.array,
	    onClick: _react2.default.PropTypes.func,
	    sortedColumn: _react2.default.PropTypes.number,
	    sortReverse: _react2.default.PropTypes.bool
	};

	GridHeader.defaultProps = {
	    columns: [],
	    onClick: function onClick() {},
	    sortedColumn: -1,
	    sortReverse: false
	};

	exports.default = GridHeader;

/***/ }
/******/ ]);