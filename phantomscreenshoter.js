var   page              = require('webpage').create()
    , system            = require('system')
    , url               = system.args[1]
    , viewport          = system.args[2] || '1024x768'
    , filename          = system.args[3]
    , address           = 'http://' + url
    , viewportSplitted  = viewport.split('x')
    ;

page.viewportSize = {
    width:  viewportSplitted[0],
    height: viewportSplitted[1]
};

page.open(address, function () {
    page.render(filename);
    phantom.exit();
});
