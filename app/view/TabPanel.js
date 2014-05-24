Ext.define('PegelOnline.view.TabPanel', {
    extend : 'Ext.tab.Panel',
    xtype  : 'maintabs',

    requires : [
        'PegelOnline.view.Help',
        'PegelOnline.view.Main',
        'PegelOnline.view.Map'
    ],

    config: {
        tabBarPosition : 'bottom',
        layout         : { animation: 'flip' },

        items: [
            {
                iconCls : 'more',
                title   : 'List',
                xtype   : 'main'
            },
            {
                iconCls : 'maps',
                title   : 'Map',
                xtype   : 'wmap'
            },
            {
                iconCls : 'info',
                title   : 'Info',
                xtype   : 'help'
            }
        ]
    }
});
