/*
 * grunt-universal-tests
 *
 *
 * Copyright (c) 2014 Jorge Colindres
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('universal_tests', 'Combine your tests into one.', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      template: 'src/test/template.html',
      separator: '\n'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {

      // Returned the parsed contents for each file,
      // and join the parsed contents.
      var specFiles = file.src.map(function(filepath) {
        var html;

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          html = grunt.file.read(filepath);
          if (html) {
            return html.match( new RegExp('<!--[(][*]begin_spec_files[)](-->)?([\\s\\S]*?)(<!--)[(][*]end_spec_files[)](-->)', 'g') );
          }
        }
      })
      .join( grunt.util.normalizelf(options.separator) );

      var fin = grunt.file.read(options.template).replace(/{{( SPEC_FILES )}}/g, specFiles);

      // Write all the parsed content to destination.
      grunt.file.write(file.dest, fin);

      // Print a success message.
      grunt.log.writeln('Template "' + file.dest + '" updated.');
    });
  });
};
