Ext.define('PegelOnline.view.Main', {
    extend   : 'Ext.Container',
    xtype    : 'main',

    requires : [
        'Ext.Title',
        'Ext.Toolbar',
        'PegelOnline.view.Measurements',
        'PegelOnline.view.Stations',
        'PegelOnline.view.Waters'
    ],

    config   : {
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
