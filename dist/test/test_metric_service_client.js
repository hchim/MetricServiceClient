'use strict';

var _MetricServiceClient = require('../MetricServiceClient');

var _MetricServiceClient2 = _interopRequireDefault(_MetricServiceClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert'); /**
                                 * Created by huiche on 1/27/17.
                                 */

var expect = require('Chai').expect;

var conf = {
    get: function get(key) {
        if (key === 'endpoint.metricservice') {
            return "http://localhost:3012";
        }
    }
};

var metricsclient = new _MetricServiceClient2.default(conf);

describe('metrics functions', function () {
    describe('increaseCounter', function () {
        it('should add count metric', function (done) {
            metricsclient.increaseCounter('Test:CountMetric', function (err, json) {
                if (err) done(err);
                expect(json).to.include.keys('_id');
                done();
            });
        });
    });

    describe('errorMetric', function () {
        it('should add error metric', function (done) {
            var err = {
                errCode: "Error code",
                message: "error message"
            };

            metricsclient.errorMetric('Test:ErrorMetric', err, function (err, json) {
                if (err) done(err);
                expect(json).to.include.keys('_id');
                done();
            });
        });
    });

    describe('messageMetric', function () {
        it('should add message metric', function (done) {
            var msg = {
                message: "error message"
            };

            metricsclient.messageMetric('Test:MsgMetric', msg, function (err, json) {
                if (err) done(err);
                expect(json).to.include.keys('_id');
                done();
            });
        });
    });

    describe('time Metric', function () {
        it('should add metric metric', function (done) {
            var tag = "Test:TimeMetric";
            metricsclient.startTimeMetric(tag);
            setTimeout(function () {
                metricsclient.stopTimeMetric(tag, function (err, json) {
                    if (err) done(err);
                    expect(json).to.include.keys('_id');
                    done();
                });
            }, 50);
        });
    });
});