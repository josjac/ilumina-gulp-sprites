/*
 * configuracion:
 *[
 *  {
 *    src: 'src/static/sprites',
 *    dest_img: 'dist/static/sprites',
 *    dest_css: 'src/static/sprites'
 *  }
 *]
*/

var gulp = require('gulp');

var sprites = require('gulp.spritesmith');

var path = require('path');

var fs = require('fs');

var cwd = process.cwd();

var default_config = {
  src: path.join(cwd, 'src', 'static', 'sprites'),
  dest_img: path.join(cwd, 'dist', 'static', 'sprites'),
  dest_css: path.join(cwd, 'src', 'static', 'sprites')
};

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

module.exports = function(configs) {
  configs = configs || [default_config];

  gulp.task('sprites', function() {

    configs.forEach(function(config) {
      getFolders(config.src).map(function(dir) {
        var d = gulp.src(path.join(config.src, dir, '*.png'))
          .pipe(sprites({
            imgName: dir + '.png',
            cssName: dir + '.styl',
            cssPath: '../sprites/'
          }));

        if (config.dest) {
          d.pipe(gulp.dest(config.dest));
        }

        else {
          d.img
          .pipe(gulp.dest(config.dest_img));

          d.css
          .pipe(gulp.dest(config.dest_css));
        }
      });
    });
  });
};
