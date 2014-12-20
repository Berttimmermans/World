module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'js/**/*.js',
        dest: '../prod/js/app.js'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sassDir: 'sass',
          cssDir: '../prod/css',
          quiet: true
        }
      }
    },
    watch: {
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['compass', 'notify:watchCSS'],
        options: {
          livereload: true,
        }
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['uglify', 'notify:watchJS'],
        options: {
          livereload: true,
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: '../prod/'
        }
      }
    },
    notify:{
      start:{
        options:{
          title: 'GRUNT Start',
          message: 'Great succes!'
        }
      },
      watchCSS: {
        options:{
          title: 'CSS compiled',
          message: 'Great success!'
        }
      },
      watchJS: {
        options:{
          title: 'JS compiled',
          message: 'Great success!'
        }
      }
    },
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-notify');

  // Setup tasks
  grunt.registerTask('default', ['uglify','compass']);
  grunt.registerTask('start', ['uglify','compass','connect','notify:start','watch']);

};