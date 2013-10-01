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

app.get(/^\/([^\/]+)(?:\/(\d+)x(\d+))?$/,  function (req, res) {
    var   src           = req.params[0] || 'www.kupisebedom.com'
        , width         = req.params[1]
        , height        = req.params[2]
        , childArgs     = [path.join(__dirname, 'phantomscreenshoter.js'), src, width, height]
        ;

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (!err) {
            res.render('image', {src: src + '.png'});
        }
    })
});


