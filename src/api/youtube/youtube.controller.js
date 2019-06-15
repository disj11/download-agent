const path = require('path');
const youtube = require('./handlers/youtube');
const mkdirp = require('mkdirp');
const fs = require('fs');

const downloadPath = path.join(__dirname, '../../public/temp');

exports.download = async ctx => {
    const {id} = ctx.params;
    const options = {
        path: downloadPath,
        audioOnly: true
    };

    mkdirp(options.path, err => {
        if (err) {
            throw err;
        }
    });

    ctx.body = `Start a download : ${id}`;
    const videoObj = await youtube.download(id, options);
    console.log(videoObj);
};

exports.play = ctx => {
    const {id} = ctx.params;
    const music = path.join(downloadPath, 'xxx.mp3');
    const stat = fs.statSync(music);

    ctx.set('Content-Type', 'audio/mpeg');
    ctx.set('Content-Length', stat.size);

    ctx.body = fs.createReadStream(music);
};