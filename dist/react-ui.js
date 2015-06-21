(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

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
            return _react2['default'].createElement(
                'form',
                {
                    action: this.props.action,
                    className: this.getClassName(),
                    method: 'POST',
                    onSubmit: this.onSubmit },
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
            this.submit(evt);
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var _classNames;

            return (0, _utils.classNames)((_classNames = {}, _defineProperty(_classNames, this.props.className, !!this.props.className), _defineProperty(_classNames, 'react-ui-ajax-form', true), _classNames));
        }
    }, {
        key: 'submit',
        value: function submit(evt) {
            this.props.onSubmit(evt);

            if (global.FormData) {
                this.submitFormData(evt);
            } else {
                evt.target.submit();
            }
        }
    }, {
        key: 'submitFormData',
        value: function submitFormData(evt) {
            (0, _utils.post)(evt.target.action, new global.FormData(evt.target), this.onResponse);
        }
    }]);

    return AjaxForm;
})(_react2['default'].Component);

AjaxForm.propTypes = {
    className: _react2['default'].PropTypes.string,
    onResponse: _react2['default'].PropTypes.func,
    onSubmit: _react2['default'].PropTypes.func,
    url: _react2['default'].PropTypes.string
};

AjaxForm.defaultProps = {
    className: '',
    onResponse: _utils.noop,
    onSubmit: _utils.noop,
    url: ''
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsAjaxForm = require('./components/AjaxForm');

var _componentsAjaxForm2 = _interopRequireDefault(_componentsAjaxForm);

exports['default'] = _componentsAjaxForm2['default'];
module.exports = exports['default'];

},{"./components/AjaxForm":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AjaxForm = require('./AjaxForm');

var _AjaxForm2 = _interopRequireDefault(_AjaxForm);

exports['default'] = {
    AjaxForm: _AjaxForm2['default']
};
module.exports = exports['default'];

},{"./AjaxForm":2}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.classNames = classNames;
exports.noop = noop;
exports.post = post;

function classNames() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return (typeof args[0] === 'object' ? Object.keys(args[0]).filter(function (key) {
        return args[0][key];
    }) : args).join(' ');
}

function noop() {}

function post(url, data, cb) {
    var req = new global.XMLHttpRequest();

    req.onload = function () {
        return req.status > 199 && req.status < 400 ? cb(undefined, req) : cb(new Error('ReactUI.AjaxForm: Status Error'), req);
    };
    req.onerror = function () {
        return cb(new Error('ReactUI.AjaxForm: Network Error'), req);
    };
    req.open('POST', url, true);
    req.send(data);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[3]);
