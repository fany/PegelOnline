Ext.define('PegelOnline.store.Stations', {
    alias    : 'store.stations',
    extend   : 'Ext.data.Store',
    requires : [ 'PegelOnline.model.Station' ],

    config: {
        storeId : 'stations',
        model   : 'PegelOnline.model.Station',
        sorters : 'km',
        proxy: {
            type                : 'ajax',
            useDefaultXhrHeader : false,
            reader              : { type: 'json' }
        },

        urlPrefix : 'http://www.pegelonline.wsv.de' +
                    '/webservices/rest-api/v2/stations.json?waters='
    }
});
