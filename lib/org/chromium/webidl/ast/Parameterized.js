// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl.ast',
  name: 'Parameterized',

  properties: [
    {
      class: 'FObjectArray',
      of: 'org.chromium.webidl.ast.Argument',
      name: 'args',
    },
  ],
});
