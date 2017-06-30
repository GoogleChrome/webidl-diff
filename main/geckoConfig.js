// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

var IDLFileContents = foam.lookup('org.chromium.webidl.IDLFileContents');
var GithubIDLFile = foam.lookup('org.chromium.webidl.GithubIDLFile');

var githubBaseURL = 'https://github.com/mozilla/gecko-dev';
var config = {
  renderer: 'Gecko',
  repositoryURL: 'https://github.com/mozilla/gecko-dev.git',
  localRepositoryPath: require('path').resolve(__dirname, 'data/gecko/git'),
  sparsePath: 'dom',
  findExcludePatterns: ['*/test/*'],
  extension: 'webidl',
  parser: 'GeckoParser',
  freshRepo: false,
};
config.idlFileContentsFactory = function(path, contents) {
  // Classes are injected by ...
  return IDLFileContents.create({
    metadata: GithubIDLFile.create({
      repository: this.repositoryURL,
      githubBaseURL: githubBaseURL,
      revision: this.commit,
      path: path,
    }),
    contents: contents,
  });
};
module.exports = { config };
