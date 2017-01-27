Ext.define('PegelOnline.view.TabMap', {
    extend   : 'Ext.Container',
    xtype    : 'tabMap',

    requires : [
        'PegelOnline.view.Map',
        'PegelOnline.view.Measurements'
    ],

    config   : {
        layout : 'card',

        listeners: {
            show   : 'onShow',
            single : true
        }
    },

    onShow: function () {
        // console.log('tabMap: onShow');
        this.add([
            { xtype : 'wmap' },
            { xtype : 'measurements' }
        ]);
    }
});
