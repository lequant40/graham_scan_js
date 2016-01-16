module.exports = function(grunt) {
  var path = require('path');

  //
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
    uglify: {
      options: {
        preserveComments: function (info, comment) {
          // Only keep the banner comment.
          return comment.pos === 0;
        }
      },
      graham_scan: {
        files: {
          'graham_scan.min.js': path.join('src', 'graham_scan.js')
        }
      }
    },
	
	qunit: { 
      all: ['tests/index.html']
    }

  });

  //
  grunt.registerTask('deliver', 'Builds the app into a distributable package and tests it.', function() {
    grunt.task.run('uglify:graham_scan');
	grunt.task.run('qunit');
  });


};
