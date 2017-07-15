﻿require('rootpath')();
var express = require('express'),
    path = require('path'),
    fs = require('fs');
var app = express();
var staticRoot = __dirname + '/dist';
var config = require('config.json');
app.set('port', (process.env.PORT || 8080));
app.use(express.static(staticRoot));
app.use('/questions', require('./src/app/routes/questions'));

app.use(function (req, res, next) {
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
        return next();
    }
    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== '') {
        return next();
    }
    fs.createReadStream(staticRoot + 'index.html').pipe(res);

});

app.listen(app.get('port'), function () {
    console.log('app running on port', app.get('port'));
});



