Ext.define('PegelOnline.view.TabMap', {
    extend   : 'Ext.Container',
    xtype    : 'tabMap',

    requires : [
        'PegelOnline.view.Map',
        'PegelOnline.view.Measurements'
    ],

    config   : {
        layout : 'card',

        items: [
            { xtype  : 'wmap' },
            { xtype  : 'measurements' }
        ]
    }
});
