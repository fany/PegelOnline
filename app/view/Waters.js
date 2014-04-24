Ext.define('PegelOnline.view.Waters', {
    extend   : 'Ext.dataview.List',
    xtype    : 'waters',

    requires : [ 'PegelOnline.store.Waters' ],

    config   : {
        itemTpl : '{longname}',
        store   : { type : 'waters' }
    }
});
