var request = require('request');
var os = require('os')

var increaseCounter =  function(tag, callback) {
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
    }, function (err, res, body){
        if (err) {
            return callback(err, null);
        }

        var json = JSON.parse(body);
        callback(null, json);
    });
}

var errorMetric = function(tag, err, callback) {
    if (typeof err == 'object') {
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
    }, function (err, res, body){
        if (err) {
            return call(err, null);
        }

        var json = JSON.parse(body);
        callback(null, json);
    });
}

var messageMetric = function(tag, msg, callback) {
    if (typeof msg == 'object') {
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
    }, function (err, res, body){
        if (err) {
            return callback(err, null);
        }

        var json = JSON.parse(body);
        callback(null, json);
    });
}

var startTimeMetric = function (tag) {
    this.tag_map[tag] = new Date();
}

var stopTimeMetric = function (tag, callback) {
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
    }, function (err, res, body){
        if (err) {
            return callback(err, null);
        }

        var json = JSON.parse(body);
        callback(null, json);
    });
}

module.exports = function (config) {
    this.endpoint = config.get("endpoint") + '/metrics';
    this.tag_map = {}

    this.increaseCounter = increaseCounter;
    this.errorMetric = errorMetric;
    this.messageMetric = messageMetric;
    this.startTimeMetric = startTimeMetric;
    this.stopTimeMetric = stopTimeMetric;

    return this;
};