// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'ParserRunner',
  extends: 'org.chromium.webidl.PipelineRunner',

  requires: [
    'org.chromium.webidl.BaseIDLFile',
    'org.chromium.webidl.BaseParser',
    'org.chromium.webidl.ast.Definition',
    'org.chromium.webidl.Parser as DefaultParser',
  ],

  documentation: 'Runnable Box that parsers IDLFileContents into ASTs.',

  properties: [
    {
      class: 'Class',
      documentation: 'Class of the parser used to parse the IDL files.',
      name: 'Parser',
      factory: function() {
        // TODO: Replace with a smarter method of choosing a parser.
        return this.DefaultParser;
      },
    },
    {
      class: 'String',
      name: 'ioRelationshipType',
      documentation: 'The n:m relationship type of input-to-output.',
      value: '1:many',
    },
    {
      class: 'Class',
      documentation: 'Type of input parameter of run().',
      name: 'inputType',
      factory: function() {
        return this.BaseIDLFile;
      },
    },
    {
      class: 'Class',
      documentation: 'Type of output values produced by run().',
      name: 'outputType',
      factory: function() {
        return this.Definition;
      },
    },
    {
      documentation: 'An instance of the parser class.',
      name: 'parser_',
      factory: function() {
        return this.Parser.create();
      },
    },
  ],

  methods: [
    function init() {
      foam.assert(this.BaseParser.isInstance(this.parser_));
      this.SUPER();
    },
    function run(file) {
      if (this.validateMessage(file)) return;

      // Prepare metadata to be injected by parser.
      var metadata = file.cls_.create({id: file.id});
      var results = this.parser_.parseString(file.contents, metadata);

      // Determine if parse of entire file was successful.
      if (!Array.isArray(results.value) ||
          file.contents.length !== results.pos) {
        this.error(this.fmtErrorMsg(`Incomplete parse on file.
            Metadata: ${foam.json.Pretty.stringify(metadata)}`));
      } else {
        var asts = results.value;
        asts.forEach(function(ast) {
          this.output(ast);
        }.bind(this));
      }
    }
  ],
});
