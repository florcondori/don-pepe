const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

const config = {
	source: './src/',
	dist: './public/'
};

const paths = {
	assets: 'assets/',
	html: '**/*.html',
	js: 'js/**/*.js',
	sass: 'scss/**/*.scss',
	img: 'img/**',
	mainSass: 'scss/main.scss',
	mainJS: 'js/app.js'
};

const sources = {
	assets: config.source + paths.assets,
	html: config.source + paths.html,
	js: config.source + paths.assets + paths.js,
	sass: config.source + paths.assets + paths.sass,
	img: config.source + paths.assets + paths.img,
	rootJS: config.source + paths.assets + paths.mainJS,
	rootSass: config.source + paths.assets + paths.mainSass
};

gulp.task('html', ()=>{
	gulp.src(sources.html)
		.pipe(gulp.dest(config.dist));
});

gulp.task('img', ()=>{
	gulp.src(sources.img)
		.pipe(gulp.dest(config.dist + paths.assets + 'img'));
});

gulp.task('sass', ()=>{
	gulp.src(sources.rootSass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.dist + paths.assets + 'css'));
});

gulp.task('js', ()=>{
	gulp.src([sources.js, sources.rootJS])
		.pipe(concat('app.js'))
		.pipe(browserify())
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest(config.dist + paths.assets + 'js'));
});

gulp.task('html-watch', ['html'], (done)=>{
	browserSync.reload();
	done();
});

gulp.task('img-watch', ['img'], (done)=>{
	browserSync.reload();
	done();
});

gulp.task('sass-watch', ['sass'], (done)=>{
	browserSync.reload();
	done();
});

gulp.task('js-watch', ['js'], (done)=>{
	browserSync.reload();
	done();
});

gulp.task('nodemon', (cb)=>{
	let started = false;

	return nodemon({
		script:'server.js'
	}).on('start', ()=>{
		if(!started){
			cb();
			started = true;
		}
	});
});

gulp.task('browser-sync', ['nodemon'], ()=>{
	browserSync.init({
		port: 5000,
		proxy: {
			target: 'localhost:3000',
			ws: true
		}
	});
});

gulp.task('serve', ['browser-sync'], ()=>{
	gulp.watch(sources.html, ['html-watch']);
	gulp.watch(sources.img, ['img-watch']);
	gulp.watch(sources.js, ['js-watch']);
	gulp.watch(sources.sass, ['sass-watch']);
});

gulp.task('run', ['html', 'js', 'sass', 'img','serve']);