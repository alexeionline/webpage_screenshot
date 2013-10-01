var   page              = require('webpage').create()
    , system            = require('system')
    , url               = system.args[1]
    , viewport          = system.args[2]
    , size              = system.args[3]
    , address           = 'http://' + url
    , viewportSplitted  = viewport.split('x')
    , sizeSplitted      = size.split('x')
    , height
    ;

if (viewport) {
    page.viewportSize = { width: viewportSplitted[0], height: viewportSplitted[1] };
}

if (size) {
    // page.zoomFactor     = sizeSplitted[0] / viewportSplitted[0];
    // page.clipRect       = { top: 0, left: 0, width: viewportSplitted[0], height: sizeSplitted[1] / page.zoomFactor };
}

page.open(address, function () {
    page.render('public/images/' + url + '.png');
    phantom.exit();
});
