var gulp = require('gulp');

var path = require('path');

var _ = require('lodash');

var inlinecss = require('gulp-inline-css');

var templates = require('ilumina-gulp-templates');

var cwd = process.cwd();

var default_config = {
  src: [
    '!' + path.join(cwd, 'src', 'templates', '_*.pug'),
    path.join(cwd, 'src', 'templates', '*.pug')
  ],
  url: path.join(cwd, 'dist', 'static'),
  dest: path.join(cwd, 'dist')
}

var self = {
  config: default_config,
  set: function(config) {
    this.config = _.assign(this.config, config);
  },
  run: function(config) {
    return mailing(config || this.config);
  }
}

function mailing(config) {
  return templates.run({
    src: config.src
  })
  .pipe(inlinecss({
    url: 'file://' + self.config.url
  }));
}

gulp.task('mailing', function() {
  self.run()
  .pipe(gulp.dest(self.config.dest))
});

module.exports = self;
