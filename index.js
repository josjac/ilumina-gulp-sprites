var gulp = require('gulp');

var sprites = require('gulp.spritesmith');

var path = require('path');

var fs = require('fs');

var _ = require('lodash');

var cwd = process.cwd();

var default_config = {
  src: path.join(cwd, 'src', 'static', 'sprites'),
  dest_img: path.join(cwd, 'dist', 'static', 'sprites'),
  dest_css: path.join(cwd, 'src', 'static', 'sprites'),
  img_path: '../sprites/'
};

var self = {
  config: default_config,
  run: function(config) {
    config = _.assign(this.config, config);
    genSprites(config);
  }
};

function getFolders(dir) {
  return fs.readdirSync(dir)

  .filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

function genSprites(config) {
  getFolders(config.src).map(function(dir) {
    var d = gulp.src(path.join(config.src, dir, '*.png'))
      .pipe(sprites({
        imgName: dir + '.png',
        cssName: dir + '.styl',
        imgPath: config.img_path + dir + '.png'
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
}

gulp.task('sprites', function() {
  self.run();
});

module.exports = self;
