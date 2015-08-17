/*
 * grunt-yml
 * https://github.com/gdarrigo/grunt-yml
 *
 * Copyright (c) 2015 gdarrigo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['expected']
        },

        // Configuration to be run (and then tested).
        yml: {
            obj: {
                options: {
                    depth: 2,
                    indent: 2
                },
                raw: {
                    a: 1,
                    b: 2,
                    c: {
                        json: true
                    }
                },
                dest: 'test/expected/raw.yml'
            },
            json: {
                src: [
                    'test/fixtures/data.json',
                ],
                dest: 'test/expected/data.yml'
            },
            jsonMultipleFiles: {
                files: [{
                    src: [
                        'test/fixtures/a.json'
                    ],
                    dest: 'test/expected/a.yml'
                }, {
                    src: [
                        'test/fixtures/b.json'
                    ],
                    dest: 'test/expected/b.yml'
                }]
            },
            expanded: {
                options: {
                    depth: 6,
                    indent: 2
                },
                files: [{
                    expand: true,
                    cwd: 'test/fixtures/',
                    src: ['*.json'],
                    dest: 'test/expected/multiple',
                    ext: '.yml'
                }]
            }
        },
        nodeunit: {
            tests: [
                'test/*_test.js'
            ]
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "test/expected" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', [
        'clean',
        'yml',
        'nodeunit'
    ]);

    // By default, lint and run all tests.
    grunt.registerTask('default', [
        'jshint',
        'test'
    ]);
};