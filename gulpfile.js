const { src, dest, watch, series, parallel } = require('gulp')
const server = require('gulp-server-livereload')

const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')

const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const clean = require('gulp-clean')
const size = require('gulp-filesize')

// Dev server
let http = function() {
  return src('./dist/')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      fallback: 'index.html',
      directoryListing: false,
      open: true
    }))
}

// HTML
let html = function() {
  return src('src/*.html')
    .pipe(dest('dist/'))
}

let htmlBuild = function() {
  return src('src/*.html')
    .pipe(dest('build/'))
    .pipe(size())
}

// CSS
let css = function() {
  return src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: true }))
    .pipe(dest('dist/'))
}

let cssBuild = function() {
  return src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: true }))
    .pipe(cleanCSS())
    .pipe(dest('build/'))
    .pipe(size())
}

// JS
let js = function() {
  return src('src/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest('dist/'))
}

let jsBuild = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('build/'))
    .pipe(size())
}

let cleanDir = function () {
  return src('build/')
    .pipe(clean({force: true}))
}

let watchers = function() {
  watch('src/*.html', html)
  watch('src/*.scss', css)
  watch('src/*.js', js)
}

exports.dev = parallel(http, html, css, js, watchers)
exports.build = series(cleanDir, htmlBuild, cssBuild, jsBuild)