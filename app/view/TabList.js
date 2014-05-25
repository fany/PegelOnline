Ext.define('PegelOnline.view.TabList', {
    extend   : 'Ext.Container',
    xtype    : 'tabList',

    requires : [
        'PegelOnline.view.Measurements',
        'PegelOnline.view.Stations',
        'PegelOnline.view.Waters'
    ],

    config   : {
        layout : 'card',

        items: [
            { xtype : 'waters' },
            { xtype : 'stations' },
            { xtype : 'measurements' }
        ]
    }
});
