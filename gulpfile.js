'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let plumber = require('gulp-plumber');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let server = require('browser-sync');
let svgmin = require('gulp-svgmin');
let cheerio = require('gulp-cheerio');
let replace = require('gulp-replace');
let svgSprite = require('gulp-svg-sprites');
let sassGlob = require('gulp-sass-glob');
let cssUnit = require('gulp-css-unit');
let concatCss = require('gulp-concat-css');
let minify = require('gulp-csso');

gulp.task('css:foundation', function() {
  return gulp.src('./node_modules/normalize.css/normalize.css')
      .pipe(concatCss('foundation.css'))
      .pipe(minify())
      .pipe(gulp.dest('css/'))
});

gulp.task('sprite:svg', function() {
  return gulp.src('./img/icons/*.svg')
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(cheerio({
        run: function($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
        		mode: "symbols",
				preview: false,
				selector: "%f",
				svg: {
					symbols: 'sprite.svg'
				}
      }))
	  .pipe(cheerio(function ($) {
      	$('svg').attr('style',  'display:none');
      }))
      .pipe(gulp.dest('./img/'));
});

gulp.task('style', function() {
  gulp.src('sass/style.scss')
    .pipe(sassGlob())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 1 version',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions'
      ]})
    ]))
	.pipe(cssUnit({type: 'px-to-rem', rootSize: 16}))
    .pipe(gulp.dest('css'))
    .pipe(server.reload({stream: true}));
});

gulp.task('serve', ['style'], function() {
  server.init({
    server: '.',
    notify: true,
    open: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});
