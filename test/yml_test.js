'use strict';

var grunt = require('grunt');

exports.yml = {
    setUp: function(done) {
        done();
    },
    obj: function(test) {        
        var expected = 'test/expected/raw.yml';
        var exists   = grunt.file.exists(expected);
        var raw      = grunt.config.data.yml.obj.raw;

        test.equal(exists, true, 'Create a YAML configuration file passing a raw Javascript object.');

        var converted = grunt.file.readYAML(expected);

        test.deepEqual(
            converted,
            raw,
            'The object parsed from the YAML file is equal to the one specified into the configuration file.'
        );

        test.done();
    },
    json: function(test) {
        var expected  = 'test/expected/data.yml';
        var jsonFile  = 'test/fixtures/data.json';
        var exists    = grunt.file.exists(expected);
        var object    = grunt.file.readJSON(jsonFile);

        test.equal(
            exists, 
            true, 
            'Create a YAML configuration file passing a JSON file a src grunt parameter.'
        );

        test.deepEqual(
            object,  
            grunt.file.readYAML(expected),
            'Data of the YAML file are the same of the JSON one'
        );

        test.done();
    },
    jsonMultipleFiles: function(test) {
        var expected  = [
            'test/expected/a.yml',
            'test/expected/b.yml'
        ];

        expected.forEach(function(file) {
            var exists   = grunt.file.exists(file);
            var arr      = file.split('/');
            var jsonFile = arr[arr.length -1].replace('.yml', '.json');
            var object   = grunt.file.readJSON('test/fixtures/' + jsonFile);

            test.equal(
                exists, 
                true, 
                'Create a YAML configuration file passing a JSON file a src grunt parameter.'
            );

            test.deepEqual(
                object,  
                grunt.file.readYAML(file),
                'Data of the YAML file are the same of the JSON one'
            );
        });

        test.done();
    },
    expanded: function(test) {
        var root = 'test/expected/multiple';

        grunt.file.recurse(root, function(abspath, rootdir, subdir, filename) {
            var jsonFile = 'test/fixtures/' + filename.replace('.yml', '.json');
            var object   = grunt.file.readJSON(jsonFile);

            test.deepEqual(
                object, 
                grunt.file.readYAML(abspath), 
                'Each generated YAML file has the same data of the JSON counterpart.'
            );
        });

        test.done();
    }
};
