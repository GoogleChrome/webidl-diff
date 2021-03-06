// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'DiffChunk',

  documentation: `A collection of data representing a change that was found
      during Diff of two objects.`,

  ids: [ 'definitionName', 'leftSources', 'rightSources' ],

  properties: [
    {
      class: 'String',
      documentation: 'Name of the Defintion which this chunk belongs to.',
      name: 'definitionName',
      required: true,
    },
    {
      class: 'Enum',
      of: 'org.chromium.webidl.DiffStatus',
      documentation: 'Reason for which this DiffChunk was produced.',
      name: 'status',
    },
    {
      class: 'String',
      documentation: 'Path from root of the left object to the difference.',
      name: 'leftKey',
    },
    {
      documentation: 'The value on the left side of the diff.',
      name: 'leftValue',
    },
    {
      class: 'String',
      documentation: 'Path from root of the right object to the difference.',
      name: 'rightKey',
    },
    {
      documentation: 'The value on the right side of the diff.',
      name: 'rightValue',
    },
    {
      class: 'FObjectArray',
      of: 'org.chromium.webidl.BaseIDLFile',
      documentation: 'Sources from which the left definition is composed of.',
      name: 'leftSources',
    },
    {
      class: 'FObjectArray',
      of: 'org.chromium.webidl.BaseIDLFile',
      documentation: 'Sources from which the right definition is composed of.',
      name: 'rightSources',
    },
  ],
});
