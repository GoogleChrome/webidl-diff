require('foam2');
require('../node_modules/foam2/src/foam/nanos/nanos.js');

var path = require('path');
var rootDir = path.resolve(__dirname, '..');
// Load files into global.WEB_IDL_DIFF_FILES.
require(path.resolve(rootDir, 'config', 'files.js'));
var files = global.WEB_IDL_DIFF_FILES.slice();
for (var i = 0; i < files.length; i++) {
  require(path.resolve(rootDir, files[i]));
}


var HTMLFileContents = foam.lookup('org.chromium.webidl.HTMLFileContents');
var HTTPRequest = foam.lookup('foam.net.RetryHTTPRequest');
var PipelineMessage = foam.lookup('org.chromium.webidl.PipelineMessage');

process.on('message', function(message) {
  var obj = foam.json.parse(message)
  var urls = obj.urls;

  urls.forEach(function(url, index) {
    HTTPRequest.create({url:url}).send()
        .then(function(response) {
          if (response.status !== 200) throw response;
          response.payload.then(function(payload) {
            var file = HTMLFileContents.create({
              url: url,
              timestamp: new Date(),
              contents: payload,
            });

            var newMessage = PipelineMessage.create({
              htmlFile: file,
              parser: message.parser,
            });

            var data = foam.json.Network.objectify(newMessage);
            process.send(data);
          });
        })
      .catch(function(ex) {
        console.warn(`URL: ${url}, Error: ${ex}`);
      });
  });
});
