Ext.define('PegelOnline.store.Waters', {
    alias    : 'store.waters',
    extend   : 'Ext.data.Store',
    requires : [ 'PegelOnline.model.Water' ],

    config: {
        model    : 'PegelOnline.model.Water',
        sorters  : 'longname',
        autoLoad : true,

        grouper: {
            groupFn: function (record) {
                return record.get('longname')[0];
            }
        },

        proxy: {
            type                : 'ajax',
            url                 : 'http://www.pegelonline.wsv.de' +
                                  '/webservices/rest-api/v2/waters.json',
            useDefaultXhrHeader : false,
            reader              : { type: 'json' }
        }
    }
});
