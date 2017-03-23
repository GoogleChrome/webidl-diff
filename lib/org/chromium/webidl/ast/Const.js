// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl.ast',
  name: 'Const',
  extends: 'org.chromium.webidl.ast.MemberData',
  implements: [
    'org.chromium.webidl.ast.Named',
    'org.chromium.webidl.ast.Defaulted',
    'org.chromium.webidl.ast.Typed',
  ],

  methods: [
    function outputWebIDL(o) {
      o.out('const ').output(this.type).out(' ').output(this.name).out(' = ')
        .output(this.value).out(';');
    },
  ],
});
