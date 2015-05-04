'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _getParameterNames = require('get-parameter-names');

var _getParameterNames2 = _interopRequireDefault(_getParameterNames);

function _assertNotDisposed(obj) {
    if (!obj.hasOwnProperty('_modules')) {
        throw new Error('instance was disposed and is no longer usable!');
    }
}

var DI = (function () {
    function DI() {
        _classCallCheck(this, DI);

        this._modules = {};
    }

    _createClass(DI, [{
        key: 'define',
        value: function define(name, value) {
            _assertNotDisposed(this);

            this._modules[name] = value;

            return this; // allow chaining
        }
    }, {
        key: 'use',
        value: function use(fn) {
            var _this = this;

            _assertNotDisposed(this);

            if ('function' !== typeof fn) {
                throw new Error('argument has to be a function');
            }

            var args = _getParameterNames2['default'](fn).map(function (fnName) {
                if (!_this._modules.hasOwnProperty(fnName)) {
                    throw new Error('dependency ' + fnName + ' not available!');
                } else {
                    return _this._modules[fnName];
                }
            });

            return fn.apply(undefined, _toConsumableArray(args));
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            _assertNotDisposed(this);

            delete this._modules;
        }
    }]);

    return DI;
})();

exports['default'] = DI;
module.exports = exports['default'];