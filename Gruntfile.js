module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'src',
                    keepalive: true
                }
            }
        },

        clean: {
            build: ['tmp', 'dist']
        },

        html2js: {
            templates: {
                options: {
                    module: 'templates-quizz'
                },
                src: ['src/templates/*.html'],
                dest: 'tmp/templates-quizz.js'
            }
        },

        concat: {
            'quizz-no-template': {
                src: ['src/js/quizz-module-no-template.js', 'src/js/controllers/*.js', 'src/js/directives/*.js'],
                dest: 'dist/js/quizz.js'
            },
            'quizz-template': {
                src: ['src/js/quizz-module-template.js', 'src/js/controllers/*.js', 'src/js/directives/*.js', 'tmp/templates-quizz.js'],
                dest: 'dist/js/quizz-tmpl.js'
            }
        },

        uglify: {
            'quizz-no-template': {
                files: {
                    'dist/js/quizz.min.js': ['dist/js/quizz.js']
                }
            },
            'quizz-template': {
                files: {
                    'dist/js/quizz-tmpl.min.js': ['dist/js/quizz-tmpl.js']
                }
            }
        },

        copy: {
            css: {
                cwd: 'src/',
                expand: true,
                src: 'css/*',
                dest: 'dist/'
            },
            js: {
                cwd: 'src/bower_components/',
                expand: true,
                src: [
                    'angular/angular.min.js',
                    'angular-animate/angular-animate.min.js',
                    'showdown/compressed/showdown.js'
                ],
                flatten: true,
                dest: 'dist/js/'
            },
            'example-js': {
                cwd: 'src/',
                expand: true,
                src: 'js/example-quizz.js',
                dest: 'dist/'
            },
            'example-html': {
                cwd: 'example/',
                expand: true,
                src: '**/*',
                dest: 'dist/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'html2js', 'concat', 'uglify', 'copy']);
    grunt.registerTask('server', ['connect:server']);
};
