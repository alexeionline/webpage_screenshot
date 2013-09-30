var   express       = require('express')
    , http          = require('http')
    , path          = require('path')
    , fs            = require('fs')
    , app           = express()
    , childProcess  = require('child_process')
    , phantomjs     = require('phantomjs')
    , binPath       = phantomjs.path
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

var server = http.createServer(app).listen(app.get('port'), function () {
	console.log('server is running on ' + app.get('port'))
});



app.get('/:page_url',  function (req, res) {

	var src = req.params.page_url || 'www.kupisebedom.com';

	var childArgs = [path.join(__dirname, 'phantomscreenshoter.js'), src];

	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  		if (!err) {
  			res.render('image', {src: src + '.png'});
  		}
	})
});


