// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'PipelineMessage',
  documentation: 'A container for messages being passed through the pipeline.',

  properties: [
    {
      name: 'ast',
      documentation: 'An array of AST nodes produced by the IDL Parser.',
    },
    {
      name: 'htmlFile',
      documentation: 'A HTMLFileContents object produced during FetchSpecRunner.',
    },
    {
      name: 'idlFile',
      documentation: 'An IDLFileContents object',
    },
    {
      name: 'parser',
      documentation: 'Name of the parser used to parse the idlFile.',
    },
    {
      name: 'renderer',
      documentation: 'Name of the rendering engine this data belongs to.',
    },
    {
      name: 'urls',
      documentation: 'List of URLs extracted from idlFile.',
    },
  ],
});
