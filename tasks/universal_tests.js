/*
 * grunt-universal-tests
 *
 *
 * Copyright (c) 2014 Jorge Colindres
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('universal_tests', 'Combine your tests into one.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      template: 'src/test/template.html',
      separator: '\n'
    });

    // Return the parsed content joined together as
    // a single string of HTML.
    function parseContent(file, regex){
      return file.src.map(function(filepath) {
        var html;

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          html = grunt.file.read(filepath);
          if (html) {
            return html.match(regex);
          }
        }
      })
      .join( grunt.util.normalizelf( options.separator) );
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      var testFiles, specFiles, fin;

      testFiles = parseContent( file, new RegExp('<!--[(][*]begin_test_files[)](-->)?([\\s\\S]*?)(<!--)[(][*]end_test_files[)](-->)', 'g') );

      specFiles = parseContent( file, new RegExp('<!--[(][*]begin_spec_files[)](-->)?([\\s\\S]*?)(<!--)[(][*]end_spec_files[)](-->)', 'g') );

      // Replace the template content with the parsed content
      // and return the finished product.
      fin = grunt.file.read(options.template)
                              .replace(/{{( test_files )}}/g, testFiles)
                              .replace(/{{( spec_files )}}/g, specFiles);


      // Delete any previously existing destination file.
      if ( grunt.file.exists(file.dest) ) {
        grunt.log.warn('Previous master test file deleted.');
        grunt.file.delete(file.dest);
      }

      // Write to the destination.
      grunt.file.write(file.dest, fin);

      // Print a success message.
      grunt.log.ok('Master test file created at ' + file.dest + '.');
    });
  });
};
