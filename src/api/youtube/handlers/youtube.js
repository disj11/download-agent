const path = require('path');
const fs = require('fs');
const youtubeDl = require('youtube-dl');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

function download(id, options = {
    path: 'downloads',
    audioOnly: false
}) {
    return new Promise(resolve => {
        const format = options.audioOnly ? 'mp3' : 'mp4';
        const video = youtubeDl(
            `https://www.youtube.com/watch?v=${id}`,
            ['--format=18'],
            {cwd: __dirname, maxBuffer: Infinity}
        );

        video.on('info', info => {
            let filename = info._filename;
            filename = filename
                .replace('.mp4', '')
                .substring(0, filename.length - 16);
            const filepath = path.join(options.path, `${filename}.${format}`);
            exist(filepath, doesExist => {
                const videoObj = {
                    name: filename,
                    id,
                    downloading: false,
                    format
                };

                if (!doesExist) {
                    ffmpeg({source: video})
                        .on('end', () => {
                            resolve(videoObj);
                        })
                        .toFormat(format)
                        .save(filepath);
                } else {
                    resolve();
                }
            });
        });
    });
}

function exist(filename, cb) {
    fs.access(filename, fs.F_OK, err => {
        cb(!err);
    });
}

module.exports = {
    download
};