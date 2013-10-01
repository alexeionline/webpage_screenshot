var   express       = require('express')
    , http          = require('http')
    , path          = require('path')
    , fs            = require('fs')
    , im            = require('imagemagick')
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

app.get('/',  function (req, res) {
    res.render('index', {title: 'home page'});
});

app.get('/api/v1/screenshot',  function (req, res) {

    var   url       = req.query.url || 'www.kupisebedom.com'
        , viewport  = req.query.viewport || '1024x768'
        , size      = req.query.size || '150x100'
        , viewportSplitted  = viewport.split('x')
        , sizeSplitted      = size.split('x')
        , ratio = sizeSplitted[0] / sizeSplitted[1]
        , width = ratio * viewportSplitted[0]
        , height = ratio * viewportSplitted[1]
        , childArgs = [ path.join(__dirname, 'phantomscreenshoter.js'), url , width + 'x' + height ]
        ;

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err) throw err;

        im.convert(['public/images/' + url + '.png', '-resize', size, 'public/images/' + url + '_resized.png'], function(err, stdout) {
            if (err) throw err;
            res.sendfile('public/images/' + url + '_resized.png');
        });
    });
});


