'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by huiche on 6/12/18.
 */
var request = require('request');
var os = require('os');

var MetricServiceClient = function () {
    function MetricServiceClient(config) {
        _classCallCheck(this, MetricServiceClient);

        this.endpoint = config.get("endpoint.metricservice") + '/metrics';
        this.tag_map = {};
    }

    _createClass(MetricServiceClient, [{
        key: 'increaseCounter',
        value: function increaseCounter(tag, callback) {
            var formData = {
                tag: tag,
                type: 'count',
                count: 1,
                hostname: os.hostname()
            };

            request.post({
                url: this.endpoint, form: formData,
                headers: {
                    'is-internal-request': 'YES'
                }
            }, function (err, res, body) {
                if (err) {
                    if (callback) {
                        callback(err, null);
                    }

                    return;
                }

                var json = JSON.parse(body);

                if (callback) {
                    callback(null, json);
                }
            });
        }
    }, {
        key: 'errorMetric',
        value: function errorMetric(tag, err, callback) {
            if ((typeof err === 'undefined' ? 'undefined' : _typeof(err)) === 'object') {
                err = JSON.stringify(err);
            }

            var formData = {
                tag: tag,
                type: 'error',
                error: err,
                hostname: os.hostname()
            };
            request.post({
                url: this.endpoint, form: formData,
                headers: {
                    'is-internal-request': 'YES'
                }
            }, function (err, res, body) {
                if (err) {
                    if (callback) {
                        callback(err, null);
                    }
                    return;
                }

                var json = JSON.parse(body);
                if (callback) {
                    callback(null, json);
                }
            });
        }
    }, {
        key: 'messageMetric',
        value: function messageMetric(tag, msg, callback) {
            if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
                msg = JSON.stringify(msg);
            }

            var formData = {
                tag: tag,
                type: 'msg',
                error: msg,
                hostname: os.hostname()
            };
            request.post({
                url: this.endpoint, form: formData,
                headers: {
                    'is-internal-request': 'YES'
                }
            }, function (err, res, body) {
                if (err) {
                    if (callback) {
                        callback(err, null);
                    }
                    return;
                }

                var json = JSON.parse(body);
                if (callback) {
                    callback(null, json);
                }
            });
        }
    }, {
        key: 'startTimeMetric',
        value: function startTimeMetric(tag) {
            this.tag_map[tag] = new Date();
        }
    }, {
        key: 'stopTimeMetric',
        value: function stopTimeMetric(tag, callback) {
            var time = new Date() - this.tag_map[tag];
            var formData = {
                tag: tag,
                type: 'time',
                time: time,
                hostname: os.hostname()
            };

            request.post({
                url: this.endpoint, form: formData,
                headers: {
                    'is-internal-request': 'YES'
                }
            }, function (err, res, body) {
                if (err) {
                    if (callback) {
                        callback(err, null);
                    }
                    return;
                }

                var json = JSON.parse(body);
                if (callback) {
                    callback(null, json);
                }
            });
        }
    }]);

    return MetricServiceClient;
}();

exports.default = MetricServiceClient;