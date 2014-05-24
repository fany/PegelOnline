Ext.define('PegelOnline.view.Main', {
    extend   : 'Ext.Container',
    xtype    : 'main',

    requires : [
        'Ext.Title',
        'Ext.Toolbar',
        'PegelOnline.view.Help',
        'PegelOnline.view.Measurements',
        'PegelOnline.view.Stations',
        'PegelOnline.view.Waters'
    ],

    config   : {
        layout : 'card',

        items: [
            { xtype  : 'waters' },
            { xtype  : 'stations' },
            { xtype  : 'measurements' },
            { xtype  : 'help' }
        ],
    }
});
