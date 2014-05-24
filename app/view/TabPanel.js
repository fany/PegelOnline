Ext.define('PegelOnline.view.TabPanel', {
    extend : 'Ext.tab.Panel',
    xtype  : 'maintabs',

    requires : [
        'PegelOnline.view.Help',
        'PegelOnline.view.Main'
    ],

    config: {
        tabBarPosition : 'bottom',
        layout         : { animation: 'flip' },

        items: [
            {
                iconCls : 'more',
                title   : 'Waters',
                xtype   : 'main'
            },
            {
                iconCls : 'info',
                title   : 'Info',
                xtype   : 'help'
            },
        ]
    }
});
