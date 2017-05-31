Metric service client library.
==============================

##Install

##Usage

Add the following library to the dependencies of your package and then run `npm install`.
```
"metricsclient": "git@github.com:hchim/MetricServiceClient.git"
```

###Count metric:

```
metricsclient.increaseCounter('Test:CountMetric', function (err, json) {
})
```

###Error metric

```
var err = {
    errCode: "Error code",
    message: "error message"
}

metricsclient.errorMetric('Test:ErrorMetric', err, function (err, json) {
})
```

###Message metric

```
metricsclient.errorMetric('Test:ErrorMetric', "error message", function (err, json) {
})
```

###Time metric

```
metricsclient.startTimeMetric(tag)
...
metricsclient.stopTimeMetric(tag, function (err, json) {
})
```

##Test

```
npm test
```

## Release History

* 0.1.0 Initial release
