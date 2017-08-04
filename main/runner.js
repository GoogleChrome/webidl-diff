// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';
require('foam2');

var path = require('path');
var rootDir = path.resolve(__dirname, '..');
// Load files into global.WEB_IDL_DIFF_FILES.
require(path.resolve(rootDir, 'config', 'files.js'));
var files = global.WEB_IDL_DIFF_FILES.slice();
for (var i = 0; i < files.length; i++) {
  require(path.resolve(rootDir, files[i]));
}

//-----------------------------------------------------------------------------
const blinkConfig = require('./blinkConfig.js').config;
const geckoConfig = require('./geckoConfig.js').config;
const webKitConfig = require('./webKitConfig.js').config;

// URL Filters
var include = [/dev\.w3\.org/, /github\.io/, /spec\.whatwg\.org/, /css-houdini\.org/, /csswg\.org/, /svgwg\.org/, /drafts\.fxtf\.org/, /www\.khronos\.org\/(registry\/webgl\/specs\/latest\/[12]\.0|registry\/typedarray\/specs\/latest)/, /www\.w3\.org\/TR\/geolocation-API/, /dvcs\.w3\.org\/hg\/speech-api\/raw-file\/tip\/webspeechapi\.html/];
var exclude = [/web\.archive\.org/, /archives/ ];

var LocalGitRunner = foam.lookup('org.chromium.webidl.LocalGitRunner');
var WebPlatformEngine = foam.lookup('org.chromium.webidl.WebPlatformEngine');
var URLExtractor = foam.lookup('org.chromium.webidl.URLExtractor');
var FetchSpecRunner = foam.lookup('org.chromium.webidl.FetchSpecRunner');
var FetchSpecRegistrySelector = foam.lookup('org.chromium.webidl.FetchSpecRegistrySelector');
var IDLFragmentExtractorRunner = foam.lookup('org.chromium.webidl.IDLFragmentExtractorRunner');
var ParserRunner = foam.lookup('org.chromium.webidl.ParserRunner');
var CanonicalizerRunner = foam.lookup('org.chromium.webidl.CanonicalizerRunner');
var DiffRunner = foam.lookup('org.chromium.webidl.DiffRunner');

// Preparing pipelines
var ctx = foam.box.Context.create();
ctx.registry = foam.box.SelectorRegistry.create({
  selector: FetchSpecRegistrySelector.create(null, ctx),
}, ctx);
var PipelineBuilder = foam.box.pipeline.PipelineBuilder;

// Pipeline Description
// Fetch from Repositories -> Extract IDL Files -> Process into IDLFileContents
//
//           (Blink) 1-> Extract URLs -> Fetch HTML -> Process HTML -> Process IDL Files -> ...
// ->Branch{
//           (Other) 2-> To Datastore -> ...
// -> Put partials together -> Diff -> Back to datastore

// Inject properties into all of the configs.
var sharedPath = PipelineBuilder.create(null, ctx)
                                .append(DiffRunner.create());

[ blinkConfig, geckoConfig, webKitConfig ].forEach(function(config) {
  var corePath = PipelineBuilder.create(null, ctx)
                                .append(ParserRunner.create({ Parser: config.parserClass }))
                                .append(CanonicalizerRunner.create({ source: config.source }))
                                .append(sharedPath);

  if (config.source === WebPlatformEngine.BLINK) {
    var blinkPL = PipelineBuilder.create(null, ctx)
                                .append(FetchSpecRunner.create())
                                .append(IDLFragmentExtractorRunner.create())
                                .append(ParserRunner.create())
                                .append(CanonicalizerRunner.create({ source: WebPlatformEngine.SPECIFICATION }))
                                .append(sharedPath)
                                .build();
    config.urlOutputBox = blinkPL;
  }
  config.fileOutputBox = corePath.build();
  config.include = include;
  config.exclude = exclude;
  config.freshRepo = false; // For this purpose...
  delete config.parserClass;
  delete config.source;
});


// Blink Pipeline
LocalGitRunner.create(blinkConfig).run();

// Gecko Pipeline
LocalGitRunner.create(geckoConfig).run();

// WebKit Pipeline
LocalGitRunner.create(webKitConfig).run();
