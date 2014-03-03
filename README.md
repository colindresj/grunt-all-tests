# grunt-all-tests

> Combine your test runners into one.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-all-tests --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-all-tests');
```

## The all_tests task
The task joins seperate test runner html files into a single file.

Run this task with the `grunt all_tests` command.

### Overview
In your project's Gruntfile, add a section named `all_tests` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  all_tests: {
    options: {
      // Task-specific options go here.
    },
    target_group: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.template
Type: `String`
Default value: `'src/test/template.html'`

The path to the template file that is used to create your destination file.

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.stripComments
Type: `Boolean`
Default value: `true`

Strips the comments used to seperate groups from the destination file.

#### options.selfClean
Type: `Boolean`
Default value: `true`

Deletes the destination file after recompiling the destination template, but before writing the file. Although this option is available, it is suggested to to use [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean).

### Usage Example

#### Default Options
In this example, all the test files in the test/fixtures directory that are prefixed with the word 'fixture' will be joined together and outputed to dist/all.html by way of the template located at the default path.

```js
grunt.initConfig({
  all_tests: {
    test: {
      files: {
        'dist/all.html': ['test/fixtures/fixture*.html'],
      }
    }
  }
});
```

#### Custom Options

```js
grunt.initConfig({
  all_tests: {
    test: {
      options: {
        template: 'test/templates/template.html',
        clean: false
      },
      files: [
        {
          src: ['test/fixtures/fixture*.html', 'spec/fixtures/another.html'],
          dest: 'tmp/all.html',
          nonull: true
        }
      ],
    }
  }
});
```

## Release History
* 2014-03-03   v0.1.0   Initial release.
