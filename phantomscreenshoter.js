var   page              = require('webpage').create()
    , system            = require('system')
    , url               = system.args[1]
    , viewport          = system.args[2] || '1024x768'
    , size              = system.args[3] || '150x100'
    , address           = 'http://' + url
    , viewportSplitted  = viewport.split('x')
    , sizeSplitted      = size.split('x')
    ;

page.zoomFactor     = sizeSplitted[0] / viewportSplitted[0];
page.viewportSize   = { width: sizeSplitted[0], height: sizeSplitted[1] };
page.clipRect       = { top: 0, left: 0, width: sizeSplitted[0], height: sizeSplitted[1] };

page.open(address, function () {
    page.render('public/images/' + url + '.png');
    phantom.exit();
});
