express-repost
==============

This middleware lets you relay a request that your express app has received to another URL. It's useful for situations where you are receiving some sort of data by HTTP POST (for example) and want it sent to secondary endpoints, particularly in cases where your response is not very important.

##Installation

    npm install express-repost

##Usage

    const repost = require('express-repost');

    app.use(repost("http://someother.url", { /* options */ }));

##Options

* `callback` an optional function with the usual `(err, response)` signature that runs when the request is complete (or fails)
* `waitForResponse = true` whether to wait for the proxied request to finish before handing off execution to the next express middleware, which might not be important when you are simply logging
* All other options are sent as parameters to `request-promise` which wraps `request`. See the [Request API](https://github.com/request/request) for details.

##License 

MIT
