Ext.define('PegelOnline.view.Main', {
    extend   : 'Ext.Container',
    xtype    : 'main',

    requires : [
        'Ext.Toolbar',
        'PegelOnline.view.Help',
        'PegelOnline.view.Measurements',
        'PegelOnline.view.Stations',
        'PegelOnline.view.Waters'
    ],

    config   : {
        fullscreen : true,
        layout     : 'card',

        items : [
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
                xtype  : 'help'
            },
            {
                docked : 'top',
                xtype  : 'toolbar',

                items: [
                    {
                        xtype  : 'title',
                        id     : 'title',

                        style: {
                            'line-height' : '1em',
                            'text-align'  : 'left'
                        }
                    },
                    {
                        id     : 'help',
                        iconCls: 'info',
                        right  : 0
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
