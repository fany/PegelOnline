Ext.define('PegelOnline.view.Main', {
    extend   : 'Ext.Container',
    xtype    : 'main',

    requires : [
        'Ext.Toolbar',
        'PegelOnline.view.Measurements',
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

                items: [
                    {
                        xtype  : 'title',
                        id     : 'title',
                        title  : 'Waters',

                        style: {
                            'line-height' : '1em',
                            'text-align'  : 'left'
                        }
                    },
                    {
                        id     : 'back',
                        text   : 'Waters',
                        ui     : 'back',
                        zIndex : 42,
                        right  : 0,
                        hidden : true
                    }
                ]
            },
            {
                xtype  : 'waters'
            },
            {
                xtype  : 'stations'
            },
            {
                xtype  : 'measurements'
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
        ],

        prevTitle : null
    },

    restoreTitle: function () {
        return this.setTitle(this.getPrevTitle());
    },

    setTitle: function (title) {
        var titlebar = this.down('#title');
        this.setPrevTitle(titlebar.getTitle());
        return titlebar.setTitle(title);
    }
});
