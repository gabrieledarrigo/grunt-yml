/*
 * grunt-yml
 * https://github.com/gdarrigo/grunt-yml
 *
 * Copyright (c) 2015 gdarrigo
 * Licensed under the MIT license.
 */

'use strict';

var YAML = require('yamljs');

module.exports = function(grunt) {
    grunt.registerMultiTask('yml', 'Convert a JSON or a Javascript object into a valid .yml configuration', function() {
        var data = this.data;

        var options = this.options({
            depth: 2,
            indent: 2
        });

        var saveToYaml = function(src, dest) {
            var yml = YAML.stringify(src, options.depth, options.indent);

            grunt.file.write(dest, yml);

            grunt.log.writeln('File "' + dest + '" created.');
        };

        var filterFiles = function(filepath) {
            if (!grunt.file.exists(filepath)) {
                return false;
            }

            return true;
        };

        this.files.forEach(function(file) {            
            if (data.raw) {
                return saveToYaml(data.raw, file.dest);
            }
            
            var filtered = file.src.filter(filterFiles);

            filtered.forEach(function(f) {
                try {
                    var obj = grunt.file.readJSON(f);
                    saveToYaml(obj, file.dest);
                } catch (e) {
                    grunt.log.warn(e);
                }
            });
        });
    });
};