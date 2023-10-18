const mysql = require('mysql');
const crypto = require('node:crypto');
const dotenv = require('dotenv');
const { response } = require('express');
const { duration } = require('moment');


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


function getFfMpeg(videoPath, videoName){

    return ffmpeg(videoPath)
            .screenshots({
              timemarks: ['00:00:02'],
              filename: `${videoName}.jpg`,
              folder: path.join(__dirname, '/media/thumbnails/'),
              size: '320x240',
            });
}


function parceDuration(duration){
    return `${(Math.floor(duration / 60)).toString().padStart(2, '0')}:${(Math.round(duration % 60)).toString().padStart(2, '0')}`;
}



exports.uploadFile = function(req, res) {
    const db = getDb();
    db.connect();
  
    const path = require('path');
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg.setFfmpegPath(ffmpegPath);
  
    const construction_id = req.query.construction_id;
      
    if (path.extname(req.file.originalname) === ".mp4") {
      const videoPath = req.file.path;
      const videoName = path.basename(videoPath, path.extname(videoPath));
  
      ffmpeg.ffprobe(videoPath, (err, info) => {
        if (err) {
          console.error('Ошибка при получении метаданных видеофайла:', err);
        } else {
          const duration = parceDuration(info.streams[0].duration)
          const ffmpegg = getFfMpeg(videoPath, videoName);
          
            ffmpegg.on('end', () => {
                let query = `INSERT INTO Videos (video_url, thumbnail_url, construction_id, duration, upload_date)
                             VALUES ("${videoName}.mp4", "${videoName}.jpg", ${construction_id}, "${duration}", ${Date.now()})`;

            
            })
            .on('error', (err) => {
              console.error('Ошибка при создании миниатюры:', err);
            });
        }
      });
    } else{
        query = `insert into Photos (photo_url, construction_id, upload_date) \
                 values ("${req.file.filename}", ${construction_id}, ${Date.now()})`;
    }

    db.query(query, function(err, result, fields) {
        if (result === undefined || construction_id === undefined) {
            console.log(err);
            return;
        }
    
            res.json("Успешно загружено!");
        });
  
    db.end()
  };