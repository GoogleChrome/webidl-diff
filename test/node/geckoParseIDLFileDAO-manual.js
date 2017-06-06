// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

var githubBaseURL = 'https://github.com/mozilla/gecko-dev';
var config = {
  description: 'Gecko IDL file DAO manual test',
  repositoryURL: 'https://github.com/mozilla/gecko-dev.git',
  localRepositoryPath: require('path').resolve(__dirname, '../data/gecko/git'),
  sparsePath: 'dom',
  findExcludePatterns: ['*/test/*'],
  extension: 'webidl',
  parser: 'GeckoParser'
};
config.idlFileContentsFactory = function(path, contents) {
  // Classes are injected by manualLocalGitTest.
  return config.IDLFileContents.create({
    metadata: config.GithubIDLFile.create({
      repository: this.repositoryURL,
      githubBaseURL: githubBaseURL,
      revision: this.commit,
      path: path,
    }),
    contents: contents,
  });
};
global.parseIDLFileDAOTest(config);
