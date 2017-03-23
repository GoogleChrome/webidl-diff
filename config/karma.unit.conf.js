// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

// Run unit tests in Karma.
const base = require('./karma.conf.js');

module.exports = function(config) {
  base(config);
  config.set({
    files: base.deps
      .concat(base.entries)
      .concat(base.helpers)
      .concat(base.units),
  });
};
