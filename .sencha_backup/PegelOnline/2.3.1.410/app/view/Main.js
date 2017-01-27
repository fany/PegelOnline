Ext.define('PegelOnline.view.Main', {
    extend : 'Ext.tab.Panel',
    xtype  : 'main',

    requires : [
        'PegelOnline.view.TabInfo',
        'PegelOnline.view.TabList',
        'PegelOnline.view.TabMap'
    ],

    config: {
        tabBarPosition : 'bottom',
        layout         : { animation: 'flip' },

        items: [
            {
                iconCls : 'more',
                title   : 'List',
                xtype   : 'tabList'
            },
            {
                iconCls : 'maps',
                title   : 'Map',
                xtype   : 'tabMap'
            },
            {
                iconCls : 'info',
                title   : 'Info',
                xtype   : 'tabInfo'
            }
        ]
    }
});
