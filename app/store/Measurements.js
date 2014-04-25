Ext.define('PegelOnline.store.Measurements', {
    alias    : 'store.measurements',
    extend   : 'Ext.data.Store',
    requires : [ 'PegelOnline.model.Measurement' ],

    config: {
        storeId : 'measurements',
        model   : 'PegelOnline.model.Measurement',
        proxy: {
            type                : 'ajax',
            url: 'http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/1f1bbed7-c1fa-45b4-90d3-df94b50ad631/W/measurements.json',
            useDefaultXhrHeader : false,
            reader              : { type: 'json' }
        },

        urlPrefix : 'http://www.pegelonline.wsv.de' +
                    '/webservices/rest-api/v2/stations/',
        urlSuffix : '/W/measurements.json'
    }
});
