Ext.define('PegelOnline.view.Stations', {
    extend   : 'Ext.dataview.List',
    xtype    : 'stations',

    requires : [ 'PegelOnline.store.Stations' ],

    config   : {
        itemTpl          : '{longname}',
        store            : { type : 'stations' },
        grouped          : true,
        indexBar         : true,
        onItemDisclosure : true
    }
});
