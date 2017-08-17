// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

var path = require('path');
var description = 'Gecko IDL Fetch and Parse manual test';
var configPath = path.resolve(__dirname, '../../main/geckoConfig.js');

global.manualFetchAndParseTest(configPath, description);
