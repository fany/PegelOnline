Ext.define('PegelOnline.view.Stations', {
    extend : 'Ext.dataview.List',
    xtype  : 'stations',

    requires: [
        'Ext.Title',
        'Ext.Toolbar',
        'Ext.XTemplate',
        'PegelOnline.store.Stations'
    ],

    config: {
        items: [
            {
                docked : 'top',
                xtype  : 'toolbar',

                items: [
                    {
                        xtype : 'title',
                        style : { 'text-align': 'left' }
                    },
                    {
                        id     : 'backToWaters',
                        text   : 'Waters',
                        ui     : 'back',
                        zIndex : 42,
                        right  : 0
                    }
                ]
            }
        ],

        itemTpl          : Ext.create(
                               'Ext.XTemplate',
                               '<div style="float:right;margin-right:2em">',
                               '(@ km {[this.formatKm(values.km)]})</div>',
                               '{longname}',
                               {
                                   formatKm: function (km) {
                                                 return km.toFixed(1);
                                             }
                               }
                           ),
        store            : { type : 'stations' },
        onItemDisclosure : true
    }
});
