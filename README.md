Metric service client library.
==============================

##Install

##Usage

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