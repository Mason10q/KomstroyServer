const mysql = require('mysql');
const crypto = require('node:crypto');
const dotenv = require('dotenv');
const { response } = require('express');


function getConfig() {
    return dotenv.config({path: __approot + '/.env'});
}

function getDb(){
    return mysql.createConnection({
        host: getConfig().parsed.DB_HOST,
        user: getConfig().parsed.DB_USER,
        database: getConfig().parsed.DB_NAME,
        password: getConfig().parsed.DB_PASS,
    });
}

exports.isPasswordCorrect = function(savedHash, passwordAttempt, callback) {
    let config = getConfig().parsed;
    crypto.pbkdf2(passwordAttempt, config.SALT, Number(config.ITERATIONS), 64, config.METHOD, function(ee, derivedKey){
        callback(derivedKey.toString('hex') == savedHash);
    });
}

 
exports.getHouses = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select * from Houses";

    db.query(query, function(err, result, fields){

        if(result === undefined) { console.log(err); return;}

        response.json(result)
    });

    db.end();
}



exports.getStates = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select state from States";

    db.query(query, function(err, result, fields){     
        
        if(result === undefined) { console.log(err); return;}

        response.json(result)
    });

    db.end();
}

exports.getNews = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select * from News where construction_id = " + request.query.construction_id;

    db.query(query, function(err, result, fields){

        if(result === undefined) { console.log(err); return;}

        response.json(result)
    });

    db.end();
}



exports.getAllWorkers = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select * from Workers";

    db.query(query, function(err, result, fields){

        if(result === undefined) { console.log(err); return;}

        console.log(result)
        response.json(result)
    });

    db.end();
}


exports.getAllForemens = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select F.id, F.name, F.foremen_phone, F.telegram_tag, M.messenger \
                 from Foremens as F \
                 join Messengers as M \
                 on F.messenger_id = M.id;";

    db.query(query, function(err, result, fields){

        if(result === undefined) { console.log(err); return;}

        console.log(result)
        response.json(result)
    });

    db.end();
}

