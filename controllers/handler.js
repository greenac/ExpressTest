/**
 * Created by agreen on 3/19/15.
 */

function base(response) {
    console.log('request handler for getPeople called');
    response.send('<h1>This Is The Start</h1>');
}

function getPeople(response) {
    console.log('request handler for getPeople called');
}

exports.base = base;
exports.getPeople = getPeople;