/**
 * Created by agreen on 3/19/15.
 */

/**
 * Created by agreen on 3/17/15.
 */
var mysql = require('mysql');

//var connection = mysql.createConnection({
//    host: 'localhost',
//    user: 'andre',
//    password: 'Perhar@6221',
//    database: 'node_test'
//});

function People() {
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'andre',
        password: 'Perhar@6221',
        database: 'node_test'
    });
}

People.prototype.getAllPeople = function(callback) {
    console.log('mysql interface processing get all people');
    var queryInterface = new QueryInterface('SELECT * FROM person');
    queryInterface.makeQuery(callback);
};

People.prototype.getSinglePerson = function(personId, callback) {
    console.log('mysql interface processing get single person');
    var query = 'SELECT * FROM person WHERE id=' + personId;
    var queryInterface = new QueryInterface(query);
    queryInterface.makeQuery(callback);
};

People.prototype.postSinglePerson = function(payload) {
    var keys = Object.keys(payload);
    var values = [];
    keys.forEach(function(key) {
        values.push(payload[key]);
    });

    var statement = 'INSERT INTO person ' + this.fieldsString(keys) + ' VALUES ' + this.valueString(values);

    this.connection.connect();
    var that = this;
    this.connection.query(statement, function(err, res) {
        if (err) {
            console.log('error in query: ' + statement);
        } else {
            console.log('query was a success: ' + statement);
        }

        that.connection.end();
    });
};

People.prototype.getPets = function(personId, callback) {
    var query = 'select * from pets where person_id=' + personId;
    var queryInterface = new QueryInterface(query);
    queryInterface.makeQuery(callback);
};

People.prototype.getAllPeopleWithPets = function (callback) {
    var query = 'select * from person right join pet on person.personId=pet.pet_personId';
    var queryInterface = new QueryInterface(query);
    queryInterface.makeQuery(callback);
};

People.prototype.fieldsString = function(keys) {
    var fieldsString = '(';
    keys.forEach(function(key, i){
        fieldsString += key;
        if (i === keys.length - 1) {
            fieldsString += ')';
        } else {
            fieldsString += ', ';
        }
    });

    return fieldsString;
};

People.prototype.valueString = function(values) {
    var valueString = '(';
    values.forEach(function(value, i) {
        valueString += '"' + value + '"';
        if (i === values.length - 1) {
            valueString += ')';
        } else {
            valueString += ', ';
        }
    });

    return valueString;
};

function Pets() {
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'andre',
        password: 'Perhar@6221',
        database: 'node_test'
    });
}

Pets.prototype.getAllPets = function(callback) {
    var queryInterface = new QueryInterface('select * from pets');
    queryInterface.makeQuery(callback);
};

function QueryInterface(query) {
    this.query = query;
    this.connection = this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'andre',
        password: 'Perhar@6221',
        database: 'node_test'
    });
}

QueryInterface.prototype.makeQuery = function(callback) {
    var that = this;
    this.connection.query(this.query, function(err, rows, fields) {
        console.log('results for query: ' + this.query);
        console.log(rows);
        callback(err, rows);
        that.connection.end();
    });
};



exports.People = People;
exports.Pets = Pets;