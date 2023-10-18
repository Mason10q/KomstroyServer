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


exports.getAllClients = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select name, construction_id from Clients";

    db.query(query, function(err, result, fields){

        if(result === undefined) { console.log(err); return;}

        console.log(result)
        response.json(result)
    });

    db.end();
}



exports.getHouseClients = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select Cl.name, C.news_counter, C.photo_counter, C.task_counter, C.construction_id \
                 from Clients as Cl \
                 join Counters as C \
                 On Cl.construction_id = C.construction_id \
                 where Cl.house_id = " + request.query.house_id


    db.query(query, function(err, result, fields){

        if(result === undefined) { console.log(err); return;}

        console.log(result)
        response.json(result)
        
    });

    db.end();
}




exports.getForemenClients = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select Cl.name, C.news_counter, C.photo_counter, C.task_counter, C.construction_id \
                 from Clients as Cl \
                 join Counters as C \
                 On Cl.construction_id = C.construction_id \
                 where Cl.construction_id in (select id from Construction where foremen_id = " + request.query.foremen_id + ")"


    db.query(query, function(err, result, fields){

        if(result === undefined) { console.log(err); return;}

        console.log(result)
        response.json(result)
        
    });

    db.end();
}