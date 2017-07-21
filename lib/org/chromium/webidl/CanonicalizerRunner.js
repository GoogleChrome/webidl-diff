// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'CanonicalizerRunner',
  extends: 'org.chromium.webidl.PipelineRunner',

  requires: ['org.chromium.webidl.Canonicalizer'],

  constants: {
    MISSING_PROPS: 'Missing required properties in PipelineMessage',
  },

  properties: [
    {
      class: 'Int',
      documentation: `Amount of time in seconds to wait after the last input
        for the same source before forwarding canonical results to next runner.
        Default value is 5 minutes (300 seconds).`,
      name: 'waitTime',
      value: 300,
    },
    {
      name: 'canonicalizer_',
      factory: function() {
        return this.Canonicalizer.create({
          done: this.output.bind(this),
          waitTime: this.waitTime,
        });
      },
    },
  ],

  methods: [
    function run(message) {
      console.log(message);

      // If SUPER threw an error, we are done.
      var sup = this.SUPER(message);
      if (sup) return;

      var asts = message.ast;
      var file = message.idlFile;
      var renderer = message.renderer;

      // Verify expected parameters are present.
      if (!asts || !file || !renderer)
        return this.error(this.fmtErrorMsg(this.MISSING_PROPS));

      // Insert all of the given ASTs.
      asts.forEach(function(ast) {
        var id = file.id.concat('/');
        this.canonicalizer_.addFragment(renderer, ast, id);
      }.bind(this));
    },
  ],
});
