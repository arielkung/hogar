"use strict";

var gulp = require('gulp'),
        runSeq = require('run-sequence'),
        browserSync = require('browser-sync');

gulp.task('serve', ['deploy'], function () {
    browserSync({
        server: {
            baseDir: gulp.publicPath
        },
        port : 8080
    });

    gulp.watch(['**/*.*'], {cwd: gulp.srcPath}, function () {
        runSeq('deploy', 'browserReload');
    });
});

gulp.task('browserReload', function () {
    browserSync.reload();
});
