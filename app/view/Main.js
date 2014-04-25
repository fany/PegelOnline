Ext.define('PegelOnline.view.Main', {
    extend   : 'Ext.Container',
    xtype    : 'main',

    requires : [
        'Ext.Toolbar',
        'PegelOnline.view.Stations',
        'PegelOnline.view.Waters'
    ],

    config   : {
        fullscreen : true,
        layout     : 'card',

        items : [
            {
                docked : 'top',
                xtype  : 'toolbar',
                title  : 'Waters',
                items  : {
                    id     : 'back',
                    text   : 'Waters',
                    ui     : 'back',
                    hidden : true
                }
            },
            {
                xtype  : 'waters'
            },
            {
                xtype  : 'stations'
            },
            {
                docked : 'bottom',
                xtype  : 'toolbar',
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
