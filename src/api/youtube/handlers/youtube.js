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
            const filename = id;
            let originalFilename = info._filename;
            originalFilename = originalFilename
                .replace('.mp4', '')
                .substring(0, originalFilename.length - 16);

            const filepath = path.join(options.path, `${filename}.${format}`);
            exist(filepath, doesExist => {
                const videoObj = {
                    originalName: originalFilename,
                    name: filename,
                    id,
                    downloading: false,
                    format,
                    filepath
                };

                if (!doesExist) {
                    ffmpeg({source: video})
                        .on('end', () => {
                            resolve(videoObj);
                        })
                        .noVideo()
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