var   express       = require('express')
    , http          = require('http')
    , path          = require('path')
    , fs            = require('fs')
    , app           = express()
    , childProcess  = require('child_process')
    , phantomjs     = require('phantomjs')
    , binPath       = phantomjs.path
    , server
    ;

app.configure(function () {

    app.set('port', process.env.PORT || 8000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

});

server = http.createServer(app).listen(app.get('port'), function () {
    console.log('server is running on ' + app.get('port'))
});

app.get('/api/v1/screenshot',  function (req, res) {
    var childArgs = [
          path.join(__dirname, 'phantomscreenshoter.js')
        , req.query.url || 'www.kupisebedom.com'
        , req.query.viewport
        , req.query.size
    ];

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (!err) {
            res.render('image', {src: src + '.png'});
        }
    })
});


