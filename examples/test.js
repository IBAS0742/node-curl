// Generated by ToffeeScript 1.3.3
(function() {
  var cookieFile, curl, fs, options, p, util,
    _this = this;

  curl = require('../index');

  fs = require('fs');

  util = require('util');

  p = console.info;

  cookieFile = 'node-curl-cookie.txt';

  options = {
    VERBOSE: 1,
    COOKIEFILE: cookieFile,
    COOKIEJAR: cookieFile,
    ACCEPT_ENCODING: 'gzip',
    RAW: 1
  };

  curl.debug = 1;

  curl.setDefaultOptions(options);

  curl('www.google.com', function(_$$_err) {
    var err;
    err = _$$_err;
    p("\x1b[33m" + util.inspect(curl.info('COOKIELIST')) + "\x1b[0m");
    curl.reset();
    return curl('www.yahoo.com', function(_$$_err) {
      var stream;
      err = _$$_err;
      p("\x1b[33m" + util.inspect(curl.info('COOKIELIST')) + "\x1b[0m");
      p("body length " + curl.body.length);
      p("\x1b[33mText in " + cookieFile + "\x1b[0m");
      p("----");
      stream = fs.createReadStream(cookieFile);
      stream.pipe(process.stdout);
      return stream.on('end', function() {
        var _this = this;
        p("----");
        curl.close();
        p("deleting " + cookieFile);
        return fs.unlink(cookieFile, function() {
          return p("done.");
        });
      });
    });
  });

}).call(this);
