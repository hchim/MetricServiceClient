/**
 * Created by huiche on 6/12/18.
 */
const request = require('request');
const os = require('os');

class MetricServiceClient {
    constructor(config) {
        this.endpoint = config.get("endpoint.metricservice") + '/metrics';
        this.tag_map = {}
    }

    increaseCounter(tag, callback) {
        const formData = {
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
        }, function (err, res, body){
            if (err) {
                if (callback) {
                    callback(err, null)
                }

                return;
            }

            const json = JSON.parse(body);

            if (callback) {
                callback(null, json);
            }
        });
    }

    errorMetric(tag, err, callback) {
        if (typeof err === 'object') {
            err = JSON.stringify(err);
        }

        const formData = {
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
        }, function (err, res, body){
            if (err) {
                if (callback) {
                    callback(err, null)
                }
                return;
            }

            const json = JSON.parse(body);
            if (callback) {
                callback(null, json);
            }
        });
    }

    messageMetric(tag, msg, callback) {
        if (typeof msg === 'object') {
            msg = JSON.stringify(msg);
        }

        const formData = {
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
        }, function (err, res, body){
            if (err) {
                if (callback) {
                    callback(err, null)
                }
                return;
            }

            const json = JSON.parse(body);
            if (callback) {
                callback(null, json);
            }
        });
    }

    startTimeMetric(tag) {
        this.tag_map[tag] = new Date();
    }

    stopTimeMetric(tag, callback) {
        const time = new Date() - this.tag_map[tag];
        const formData = {
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
        }, function (err, res, body){
            if (err) {
                if (callback) {
                    callback(err, null)
                }
                return;
            }

            const json = JSON.parse(body);
            if (callback) {
                callback(null, json);
            }
        });
    }
}

export default MetricServiceClient;