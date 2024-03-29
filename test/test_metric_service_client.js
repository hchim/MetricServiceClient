/**
 * Created by huiche on 1/27/17.
 */
import MetricServiceClient from '../MetricServiceClient';

const assert = require('assert');
const expect = require('Chai').expect;

const conf = {
    get: function (key) {
        if (key === 'endpoint.metricservice') {
            return "http://localhost:3012"
        }
    }
};

const metricsclient = new MetricServiceClient(conf);

describe('metrics functions', function () {
    describe('increaseCounter', function () {
        it('should add count metric', function (done) {
            metricsclient.increaseCounter('Test:CountMetric', function (err, json) {
                if (err) done(err);
                expect(json).to.include.keys('_id');
                done()
            })
        })
    });

    describe('errorMetric', function () {
        it('should add error metric', function (done) {
            const err = {
                errCode: "Error code",
                message: "error message"
            };

            metricsclient.errorMetric('Test:ErrorMetric', err, function (err, json) {
                if (err) done(err);
                expect(json).to.include.keys('_id');
                done()
            })
        })
    });

    describe('messageMetric', function () {
        it('should add message metric', function (done) {
            const msg = {
                message: "error message"
            };

            metricsclient.messageMetric('Test:MsgMetric', msg, function (err, json) {
                if (err) done(err);
                expect(json).to.include.keys('_id');
                done()
            })
        })
    });

    describe('time Metric', function () {
        it('should add metric metric', function (done) {
            const tag = "Test:TimeMetric";
            metricsclient.startTimeMetric(tag);
            setTimeout(function () {
                metricsclient.stopTimeMetric(tag, function (err, json) {
                    if (err) done(err);
                    expect(json).to.include.keys('_id');
                    done()
                })
            }, 50);
        })
    })
});
