Ext.define('PegelOnline.store.Stations', {
    alias    : 'store.stations',
    extend   : 'Ext.data.Store',
    requires : [ 'PegelOnline.model.Station' ],

    config: {
        storeId : 'stations',
        model   : 'PegelOnline.model.Station',

        grouper: {
            groupFn: function (record) {
                return record.get('longname')[0];
            }
        },

        proxy: {
            type                : 'ajax',
            useDefaultXhrHeader : false,
            reader              : { type: 'json' }
        },

        urlPrefix : 'http://www.pegelonline.wsv.de' +
                    '/webservices/rest-api/v2/stations.json?waters='
    }
});
