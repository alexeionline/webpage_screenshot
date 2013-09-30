var page        = require('webpage').create();
var system      = require('system');
var url         = system.args[1];
var address     = 'http://' + url;

page.open(address, function () {
    page.render('public/images/' + url + '.png');
    phantom.exit();
});