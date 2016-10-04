var rp = require('request-promise');
var extend = require('extend');
var omit = require('object.omit');

var optionsDefault = {

  callback : null,
  waitForResponse : true

};


module.exports = function (url, opts) {

  var options = extend({}, optionsDefault, opts);

  return function (req, res, next) {
    
    //First get access to the raw body
    //http://stackoverflow.com/questions/9920208/expressjs-raw-body
    
    var data = '';

    req.setEncoding('utf8');
    
    req.on('data', chk => {
      data += chk;
    });

    req.on('end', () => {
      //Build a parameter object for request
      
      req._rawBody = data;

      var params = extend({
        
        url,
        method : req.method,
        headers : req.headers,
        body : req._rawBody

      }, omit(opts, Object.keys(optionsDefault)));

      console.log(opts);
      console.log(options);
      console.log(params);

      rp(params)
        .then(resp => {

          if (options.callback) {
            options.callback(null, resp);
          }

          next();

        })
        .catch( err => {
          if (options.callback) {
            options.callback(err);
          }

        })
        .finally( () => {
          if (options.waitForResponse) {
            next();
          }
        });


    });

    if (!options.waitForResponse) {

      next();


    }


  };


};
