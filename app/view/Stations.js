Ext.define('PegelOnline.view.Stations', {
    extend : 'Ext.dataview.List',
    xtype  : 'stations',

    requires: [
        'Ext.XTemplate',
        'PegelOnline.store.Stations'
    ],

    config: {
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
