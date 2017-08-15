// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'PipelineRunner',
  extends: 'foam.box.Runnable',

  requires: [
    'foam.box.LogBox',
    'foam.log.LogLevel',
    'org.chromium.webidl.CanonicalCollection',
  ],

  imports: [
    'getDAO?',
    'source?',
  ],

  properties: [
    {
      name: 'errorBox',
      factory: function() {
        return this.LogBox.create({
          name: `LogBox:${this.cls_.id}:${this.$UID}`,
          logLevel: this.LogLevel.ERROR,
        });
      },
    },
    {
      class: 'foam.dao.DAOProperty',
      documentation: `If getDAO is provided, all outputs of the runner
          will be forwarded to the given DAO (for persistent storage).`,
      name: 'outputDAO',
      factory: function() {
        var filename =
            `${this.cls_.name}${this.source ? '-' + this.source.label : ''}`;
        return this.getDAO ?
            this.getDAO(this.outputType, `${filename}`) : null;
      },
    },
  ],

  methods: [
    function fmtErrorMsg(msg, fnName) {
      return `${this.cls_.id}.${fnName}(): ${msg}`;
    },
    function validateMessage(msg) {
      if (!this.inputType.isInstance(msg)) {
        var errorMsg = this.fmtErrorMsg(
            `Expects an instance of ${this.inputType.name} object as input!`,
            'run');
        this.error(new Error(errorMsg));
        return errorMsg;
      }
    },
    function output(msg) {
      if (!this.outputType.isInstance(msg))
        console.warn(
            this.fmtErrorMsg('Message does not match outputType!', 'output'));

      this.outputDAO && this.outputDAO.put(msg);
      this.SUPER(msg);
    },
  ],
});
