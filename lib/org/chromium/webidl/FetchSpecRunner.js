// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

foam.CLASS({
  package: 'org.chromium.webidl',
  name: 'FetchSpecRunner',
  extends: 'org.chromium.webidl.PipelineRunner',

  requires: [
    'foam.net.RetryHTTPRequest',
    'org.chromium.webidl.HTMLFileContents'
  ],

  documentation: `A runnable box that expects to receive a PipelineMessage
    containing an array of URLs. The component will fetch the pages at the
    given URLs, and send a message for each page that is fetched.`,

  properties: [
    {
      class: 'Class',
      documentation: `Name of parser that is used to parse IDL
        fragments from the fetched HTML files.`,
      name: 'parserClass',
      required: true,
    },
    {
      class: 'Enum',
      of: 'org.chromium.webidl.WebPlatformEngine',
      documentation: `The group which the IDL files are canonicalized with.`,
      name: 'source',
      required: true
    },
    {
      class: 'Array',
      of: 'String',
      documentation: `A list of URLs that have been fetched by this component.
        The URLs will be used to dedup URLs and drop subsequent requests for
        URLs that have been previously fetched.`,
      name: 'urls_',
    },
  ],

  methods: [
    function run(message) {
      // validateMessage returned an error.
      if (this.validateMessage(message)) return;

      var urls = message.urls;
      if (!urls) {
        this.error(this.fmtErrorMsg('No URLs found on input message'));
        return;
      }

      // Check to see if URL has been fetched previously.
      // TODO: Deduping filter should be moved upstream.
      urls.forEach(function(url) {
        if (!this.urls_.includes(url)) {
          this.urls_.push(url);
          this.fetch_(url);
        }
      }.bind(this));
    },
    function fetch_(url) {
      var onPayload = this.onPayload.bind(this, url);
      this.RetryHTTPRequest.create({url: url}).send()
          .then(function(response) {
            if (response.status !== 200) {
              throw this.fmtErrorMsg(`Unable to fetch ${url}.
                Received response status ${response.status}`);
            }
            return response.payload.then(onPayload);
          }).catch(this.onError);
    },
  ],

  listeners: [
    function onPayload(url, payload) {
      this.output(this.PipelineMessage.create({
        htmlFile: this.HTMLFileContents.create({
          url: url,
          timestamp: new Date(),
          contents: payload,
        }),
        parserClass: this.parserClass,
        source: this.source,
      }));
    },
    function onError(error) {
      this.error(error);
    },
  ]
});
