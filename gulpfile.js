/**
 * Created by richmond on 2017/05/31.
 */

'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var paths = {
    'codeCoverage': 'index.js',
    'testSpecs': 'index.test.js',
    'coverageReport': 'coverage-report'
};

var mochaOptions = {
    'ui': 'bdd',
    'reporter': 'spec',
    'bail': true,
    'timeout': 5000
};

var reporters = [
    'html',
    'json-summary',
    'json',
    'text-summary',
    'text'
];

gulp.task('unit-test', function() {
    return gulp.src(paths.codeCoverage)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(paths.testSpecs)
                .pipe(mocha(mochaOptions)
                    .on('error', function(err) {
                        console.log(err);
                        process.exit(1);
                    })
                )
                .pipe(istanbul.writeReports({
                    'dir': paths.coverageReport,
                    'reporters': reporters
                }))
                .on('error', function() {
                    process.exit(1);
                })
                .on('end', function(test) {
                    process.exit();
                });
        });
});