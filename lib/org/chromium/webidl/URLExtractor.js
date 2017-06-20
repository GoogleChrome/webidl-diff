// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'URLExtractor',

  requires: ['org.chromium.webidl.IDLFileContents'],

  properties: [
    {
      name: 'excludeRegexp',
      // documentation: 'Excludes all URLs matching this expression.',
    },
    {
      name: 'includeRegexp',
      // documentation: 'Only include URLs matching this expression.',
    }
  ],

  constants: {
    URL_REGEX: /https?:\/\/(www\.)?[-_a-zA-Z0-9.]{2,256}\.[a-z]{2,6}(\/[^?#, \n]*)?(\?[^#, \n]*)?/g,
  },

  methods: [
    function extract(file) {
      if (this.IDLFileContents.isInstance(file)) {
        var urls = file.contents.match(this.URL_REGEX) || [];

        var includeExp = this.includeRegexp;
        var excludeExp = this.excludeRegexp;

        return urls.filter(function(url) {
          return (includeExp === undefined || !!url.match(includeExp)) &&
              (excludeExp === undefined ||  !url.match(excludeExp));
        });
      }
    },
  ]
});
