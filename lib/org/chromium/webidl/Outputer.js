// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'Outputer',

  documentation: 'Outputer for parsed Web IDL',

  properties: [
    {
      class: 'String',
      documentation: 'Buffer for current output run.',
      name: 'buf_',
      value: '',
    },
    {
      class: 'Int',
      documentation: 'Line-based indentation level.',
      name: 'indentLevel_',
    },
    {
      class: 'String',
      documentation: 'String equivalent of one indentation level.',
      name: 'indentStr',
      value: '  ',
    },
    {
      class: 'String',
      documentation: 'String equivalent of "new line".',
      name: 'newlineStr',
      value: '\n',
    },
    {
      class: 'Boolean',
      documentation: 'Toggle for enabling/disabling "pretty printing".',
      name: 'pretty',
      value: true,
      postSet: function(_, p) {
        if (p) {
          this.clearProperty('indentStr');
          this.clearProperty('newlineStr');
        } else {
          this.indentStr = this.newlineStr = null;
        }
      },
    },
  ],

  methods: [
    function reset() {
      this.indentLevel_ = 0;
      this.buf_ = '';
      return this;
    },
    function out() {
      for (var i = 0; i < arguments.length; i++) this.buf_ += arguments[i];
      return this;
    },
    function start(c) {
      if (c) this.out(c).newline();
      if (this.indentStr) {
        this.indentLevel_++;
        this.indent();
      }
      return this;
    },
    function end(c) {
      this.indentLevel_--;
      if (c) this.indent().out(c);
      return this;
    },
    function newline() {
      if (this.newlineStr && this.newlineStr.length !== 0)
        this.out(this.newlineStr);
      return this;
    },
    function indent() {
      for (var i = 0; i < this.indentLevel_; i++) this.out(this.indentStr);
      return this;
    },
    function forEach(arr, opt_start, opt_end, opt_sep) {
      // Do not bother with newline+indent separation for 0 or 1 elements.
      if (arr.length < 2) {
        if (opt_start) this.out(opt_start);
        if (arr.length === 1) this.output(arr[0]);
        if (opt_end) this.out(opt_end);
        return this;
      }

      if (opt_start) this.start(opt_start);

      // Note: Already output to where the first element belongs.
      for (var i = 0; i < arr.length; i++) {
        this.output(arr[i]);

        // Either, this is the last element and opt_end manages indentation
        // to next chunk, or newline + indent for next item.
        var last = i === arr.length - 1;
        if (last) {
          this.newline();
        } else {
          if (opt_sep) this.out(opt_sep);
          this.newline().indent();
        }
      }

      if (opt_end) this.end(opt_end);
      return this;
    },
    function output(o) {
      foam.assert(
        o.outputWebIDL, 'Object', o, 'does not implement outputWebIDL()'
      );
      o.outputWebIDL(this);
      return this;
    },
    function stringify(o) {
      this.output(o);
      var ret = this.buf_;
      this.reset();
      return ret;
    },
  ],
});
