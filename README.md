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

### File Setup
In order to join your test runners together, you'll have to first setup a test runner template. This file should include all the stylesheets and scripts required by your test suite, as well as file placeholders using the Mustache templating syntax.

```html
  <!-- Include any fixtures -->
  {{ fixtures }}

  <!-- Include any test files (what you actually want to test) -->
  {{ test_files }}

  <!-- Include any spec files -->
  {{ spec_files }}
```

In addition to creating your template, you'll need to wrap the corresponding parts for each of your individual test runners in special comment tags.

Wrap your test files using the `<!--(*begin_test_files)-->` and `<--(*end_test_files)-->` comments, spec files using the `<!--(*begin_spec_files)-->` and `<!--(*end_spec_files)-->` comments, and fixtures using the `<!--(*begin_fixtures)-->` and `<!--(*end_fixtures)-->` comments.

#### Usage Example
```html
  <!--(*begin_fixtures)-->
    <div id="fixture">
      <div class="child-fixture"></div>
      <div class="child-fixture"></div>
      <div class="child-fixture"></div>
    </div>
  <!--(*end_fixtures)-->

  <!--(*begin_test_files)-->
    <script src="test.js"></script>
    <script src="test.js"></script>
    <script src="test.js"></script>
  <!--(*end_test_files)-->

  <!--(*begin_spec_files)-->
    <script src="specfile.js"></script>
    <script src="specfile.js"></script>
  <!--(*end_spec_files)-->
```

An example template and individual runner is available in the [examples directory](https://github.com/corporadobob/grunt-all-tests/tree/master/examples).

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
        template: 'spec/template/template.html',
        clean: true
      },
      files: [
        {
          src: ['spec/test1-runner.html', spec/test2-runner.html],
          dest: 'dist/all.html',
          nonull: true
        }
      ],
    }
  }
});
```

## Release History
* 2014-03-03   v0.1.0   Initial release.
