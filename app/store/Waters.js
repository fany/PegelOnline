Ext.define('PegelOnline.store.Waters', {
    extend: 'Ext.data.Store',

    alias: 'store.waters',
    requires: [ 'PegelOnline.model.Water' ],

    config: {
        model: 'PegelOnline.model.Water',
        grouper: {
            groupFn: function (record) {
                return record.get('longname')[0];
            }
        },
        autoLoad: true,
        proxy: {
            type: 'ajax',
            // url:  'http://www.pegelonline.wsv.de/webservices/rest-api/v2/waters.json',
            url: '/tmp/waters.json',
            reader: { type: 'json' }
        }
    }
});
