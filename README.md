# grunt-yml

> Convert a JSON or a Javascript object into a valid YAML configuration file

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-yml --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-yml');
```

## The "yml" task

### Overview
In your project's Gruntfile, add a section named `yml` to the data object passed into `grunt.initConfig()`.
The task make use of [yaml.js plugin](https://github.com/jeremyfa/yaml.js).

```js
grunt.initConfig({
  yml: {
    options: {
        depth: 2,
        indent: 2
    },
    target: {
      src: [
          'path/to/data.json'
      ],
      dest: 'path/to/data.yml'
    },
  },
});
```

### Options

#### options.depth
Type: `Number`
Default value: `4`

The depth before YAML will be inlined (default 4).

#### options.indent
Type: `Number`
Default value: `2`

The number of spaces used to indent the YAML (default 2).

### Usage Examples
In this example, You can convert a JSON file using the `src` / `dest` Grunt file format.

```js
grunt.initConfig({
    yml: {
        files: {
            'dest/default_options': ['src/testing', 'src/123'],
        },
    },
});
```

You can use dynamic mapping to convert multiple files at once.

```js
grunt.initConfig({
    yml: {
        files: [{
            expand: true,
            cwd: 'test/fixtures/',
            src: ['*.json'],
            dest: 'test/expected/multiple',
            ext: '.yml'
        }]
    },
});
```

#### Raw Javascript Object
If You specify the raw option You can convert a Javascript Object literal into a valid YAML file.

```js
grunt.initConfig({
    yml: {
        raw: {
            a: 1,
            b: 2,
            c: {
                json: true
            }
        },
        dest: 'test/expected/raw.yml'
    },
});
```

## Contributing
Follow the existing coding style.
Add unit tests with [nodeunit](https://github.com/caolan/nodeunit) for any new or changed functionality. 
Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.1.0 First version