/**
 * Created by agreen on 3/19/15.
 */

var express = require('express');
var router = require('./router');
var path = require('path');
var bodyParser = require('body-parser');
var path = require('path');

function start() {
    var app = express();

    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    //app.set('view engine', 'ejs');

    // static directories
    app.use(express.static('../public/html'));
    app.use('../public/javascript', express.static(path.join(__dirname, 'public/javascript')));
    app.use('../public/css', express.static(path.join(__dirname, 'public/css')));

    // other middleware
    app.use(bodyParser.json());

    // html
    app.get('/', router.index);
    app.get('/index', router.index);

    // javascript files
    app.get('/public/javascript/:fileName', router.getJavaScriptFile);

    // css files
    app.get('/public/css/:fileName', router.getCssFile);

    // gets
    app.get('/get-people', router.getAllPeople);
    app.get('/get-people/:id', router.getSinglePerson);
    app.get('/get-pets/:id', router.getPets);
    app.get('/get-people-with-pets', router.getAllPeopleWithPets);
    app.get('/get-all-pets', router.getAllPets);

    // posts
    app.post('/post-person', router.postSinglePerson);

    var server = app.listen(3242, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('express server running at: %s:%s', host, port);
    });
}

exports.start = start;