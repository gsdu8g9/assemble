/*
 * Assemble
 * http://sellside.github.com/assemelbe
 *
 * Copyright (c) 2013 Assemble
 * MIT License
 */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },

    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    // Run tests.
    mochaTest: {
      files: ['test/**/*.js']
    },
    mochaTestConfig: {
      options: {
        reporter: 'nyan'
      }
    },

    watch: {
      all: {
        files: ['Gruntfile.js', 'lib/**/*.js', 'tasks/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'mochaTest'],
        options: {
          debounceDelay: 250
        }
      }
    },

    // "grunt-version": "https://github.com/kswedberg/grunt-version/tarball/master"
    version: {
      check: {
        src: ['package.json']
      },
      release: {
        options: {
          release: 'patch'
        },
        src: ['package.json']
      }
    },


    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js', 'tasks/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        globals: {
          module: true,
          exports: true,
          define: true
        }
      }
    },

    uglify: {}

  });

  //  grunt.loadTasks('./tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  //"grunt-version": "https://github.com/kswedberg/grunt-version/tarball/master"
  // issue with putting this in the package.json file is that it updates it's own line since it has version": in it.
  grunt.loadNpmTasks('grunt-version');

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'mochaTest',
    'watch'
  ]);

};
