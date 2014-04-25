Ext.define('PegelOnline.view.Main', {
    extend   : 'Ext.Container',
    xtype    : 'main',

    requires : [ 'PegelOnline.view.Waters' ],

    config   : {
        fullscreen : true,
        layout     : 'vbox',

        items : [
            {
                docked : 'top',
                xtype  : 'toolbar',
                title  : 'Waters'
            },
            {
                xtype  : 'waters',
                flex   : 1
            },
            {
                docked : 'bottom',
                xtype: 'toolbar',
                html   : '<small>This app uses data provided by <a href="' +
                         'http://www.pegelonline.wsv.de/webservice/" ' +
                         'style="color:inherit">PEGELONLINE WEBSERVICES</a>.' +
                         '</small>',
                style  : {
                    'background-color': 'gray',
                    color             : 'white',
                    padding           : '0.5em 0 0 0',
                    'text-align'      : 'center'
                }
            }
        ]
    }
});
