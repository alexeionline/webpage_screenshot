var   express       = require('express')
    , http          = require('http')
    , path          = require('path')
    , fs            = require('fs')
    , im            = require('imagemagick')
    , app           = express()
    , childProcess  = require('child_process')
    , phantomjs     = require('phantomjs')
    , cloudinary    = require('cloudinary')
    , md5           = require('MD5')
    , binPath       = phantomjs.path
    , server
    ;

cloudinary.config({ 
    cloud_name: 'dremdvynb',
    api_key:    '971775612952388',
    api_secret: 'w8NXM6S0NhR9ZGCmz-IHwsAhN1Y'
});

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

    var   url           = req.query.url || 'www.kupisebedom.com'
        , viewport      = req.query.viewport || '1024x768'
        , size          = req.query.size || '150x100'
        , sizeSplitted  = size.split('x')
        , filename      = 'public/images/' + md5(url + size + viewport) + '.png'
        , childArgs     = [ path.join(__dirname, 'phantomscreenshoter.js'), url, viewport, filename]
        ;

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err) throw err;

        im.convert([filename, '-resize', sizeSplitted[0] + 'x', '-extent', size, filename], function(err, stdout) {
            if (err) throw err;
            res.sendfile(filename);
        });
    });
});

app.get('/api/v1/upload',  function (req, res) {

     var  url           = req.query.url || 'www.kupisebedom.com'
        , viewport      = req.query.viewport || '1024x768'
        , size          = req.query.size || '150x100'
        , filename      = 'public/images/' + md5(url + size + viewport) + '.png'
        ;

        cloudinary.uploader.upload(filename, function (result) {
            // result.url - url to image like http://res.cloudinary.com/dremdvynb/image/upload/v1380824310/wjk3e6kbvpmu1k3o6rdw.png
            res.send(200, {
                url: result.url
            });
        });

});


