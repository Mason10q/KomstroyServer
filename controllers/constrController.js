
exports.getConstruction = function(request, response) {
    let db = getDb();

    db.connect();

    let query = "select C.start_date, C.address, F.name, F.foremen_phone, F.telegram_tag, M.messenger, S.state \
                 from Construction as C \
                 join Foremens as F \
                 On C.foremen_id = F.id \
                 join Messengers as M \
                 on F.messenger_id = M.id \
                 join States as S \
                 on C.state_id = S.id \
                 where C.id = " + request.query.construction_id

    db.query(query, function(err, result, fields){

        if(result === undefined) { console.log(err); return;}

        console.log(result)
        response.json(result[0])
        
    });

    db.end();
}


  


exports.getConstructionPhotos = function(req, res){
    let db = getDb();
    let config = getConfig();
    db.connect();

    let query = "select * from Photos where construction_id = " + req.query.construction_id

    let construction_id = req.query.construction_id

     db.query(query, function(err, result, fields){

        if(result === undefined || construction_id === undefined) { console.log(err); return;}

        result.map((photo) => { photo, photo.photo_url = "/media/images/" + photo.photo_url })

        res.json(result)
        console.log(result)
        
    });

    db.end();
}

exports.getConstructionVideos = function(req, res){
    let db = getDb();
    let config = getConfig();
    db.connect();

    let query = "select * from Videos where construction_id = " + req.query.construction_id

    let construction_id = req.query.construction_id

     db.query(query, function(err, result, fields){

        if(result === undefined || construction_id === undefined) { console.log(err); return;}

        result.map((video) => { 
            video, 
            video.video_url = "/media/videos/" + video.video_url,
            video.thumbnail_url = "/media/thumbnails/" + video.thumbnail_url
        })

        res.json(result);

        console.log(result)
    });

    db.end();
}