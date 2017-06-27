// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl.ast',
  name: 'Operation',
  extends: 'org.chromium.webidl.ast.MemberData',
  implements: [
    'org.chromium.webidl.ast.Named',
    'org.chromium.webidl.ast.Returner',
    'org.chromium.webidl.ast.Parameterized',
  ],

  properties: [
    {
      class: 'FObjectArray',
      of: 'org.chromium.webidl.ast.OperationQualifier',
      name: 'qualifiers',
    },
  ],

  methods: [
    function getId() {
      // Constructor-like declarations (e.g. serializer Example()) do not have
      // names. Instead, it is set as type. Similarly, declarations with
      // qualifiers (e.g. getter, setter) do not have names either. However,
      // since IDs are not currently used at the Operation level, we return null
      return this.name ? this.name.literal : null;
    },
    function outputWebIDL(o) {
      for (var i = 0; i < this.qualifiers.length; i++) {
        o.outputStrs(this.qualifiers[i].label, ' ');
      }
      o.outputObj(this.returnType).outputStrs(' ');
      if (this.name) o.outputObj(this.name);
      o.forEach(
        this.args, '(', ')', ','
      ).outputStrs(';');
    },
  ],
});
