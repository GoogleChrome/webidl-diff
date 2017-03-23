// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl.ast',
  name: 'DictionaryMemberData',
  extends: 'org.chromium.webidl.ast.MemberData',
  implements: [
    'org.chromium.webidl.ast.Named',
    'org.chromium.webidl.ast.Typed',
    'org.chromium.webidl.ast.Defaulted',
  ],

  properties: [
    {
      class: 'Boolean',
      name: 'isRequired',
    },
  ],

  methods: [
    function outputWebIDL(o) {
      if (this.isRequired) o.out('required ');
      o.output(this.type).out(' ').output(this.name);
      if (this.value) o.out(' = ').output(this.value);
      o.out(';');
    },
  ],
});
