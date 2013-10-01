var page        = require('webpage').create();
var system      = require('system');
var url         = system.args[1];
var width       = system.args[2];
var height      = system.args[3];
var address     = 'http://' + url;

if (width && height) {
    page.viewportSize = { width: width, height: height };
    page.clipRect = { top: 0, left: 0, width: width, height: height };
}

page.open(address, function () {
    page.render('public/images/' + url + '.png');
    phantom.exit();
});