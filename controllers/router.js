var MysqlInterface = require('./mysqlInterface.js');
var httpConstants = require('../constants/httpConstants.js');
var path = require('path');

exports.index = function(req, res) {
    var mysqlInterface = new MysqlInterface.People();
    mysqlInterface.getAllPeople(function(err, peopleData) {
        if (err) {
            throw err;
        } else {
            var mysqlInterface2 = new MysqlInterface.People();
            mysqlInterface2.getAllPeopleWithPets(function (err, peoplePetsData) {
                if (err) {
                    throw err;
                } else {
                    res.render('index', {
                        peopleData: JSON.stringify(peopleData),
                        peopleAndPetsData: JSON.stringify(peoplePetsData)
                    });
                }
            })
        }
    });
};

exports.getAllPeople = function(req, res) {
    var mysqlInterface = new MysqlInterface.People();
    mysqlInterface.getAllPeople(function(err, data) {
        if (err) {
            throw(err);
        } else {
            console.log('get all people will return: ');
            console.log(data);
            res.setHeader(httpConstants.contentType, httpConstants.typeJson);
            res.json(data);
        }
    });
};

exports.getSinglePerson = function(req, res) {
    console.log('request parameters: ');
    console.log(req.params);
    var mysqlInterface =  new MysqlInterface.People();
    mysqlInterface.getSinglePerson(req.params.id, function (err, data) {
        if (err) {
            throw(err);
        } else {
            console.log('get single person will return: ');
            console.log(data);
            res.setHeader(httpConstants.contentType, httpConstants.typeJson);
            res.json(data);
        }
    });
};

exports.postSinglePerson = function(req, res) {
    console.log('post json: ');
    console.log(req.body);
    var mysqlInterface = new MysqlInterface.People();
    mysqlInterface.postSinglePerson(req.body);
};

exports.getAllPeopleWithPets = function(req, res) {
    var mysqlInterface = new MysqlInterface.People();
    mysqlInterface.getAllPeopleWithPets(function (err, data) {
        if (err) {
            throw(err);
        } else {
            res.setHeader(httpConstants.contentType, httpConstants.typeJson);
            res.json(data);
        }
    });
};

exports.getJavaScriptFile = function(req, res) {
    getFile(req, res);
};

exports.getCssFile = function(req, res) {
    getFile(req, res);
};

exports.getAllPets = function(req, res) {
    var mysqlInterface = new MysqlInterface.Pets();
    mysqlInterface.getAllPets(function(err, data) {
        res.setHeader(httpConstants.contentType, httpConstants.typeJson);
        res.json(data);
    });
};

exports.getPets = function(req, res) {
    var mysqlInterface = new MysqlInterface.People();
    mysqlInterface.getPets(req.params.id, function(err, data) {
        res.setHeader(httpConstants.contentType, httpConstants.typeJson);
        res.json(data);
    });
};

var getFile = function(req, res) {
    var filePath = path.join( __dirname, '..', req.originalUrl);
    res.sendFile(filePath, function(err) {
        if (err) {
            throw (err);
        } else {
            console.log('sent file: ' + req.params.fileName);
        }
    });
};