Ext.define('PegelOnline.model.Station', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'uuid', type: 'auto' },
            { name: 'number', type: 'auto' },
            { name: 'shortname', type: 'auto' },
            { name: 'longname', type: 'auto' },
            { name: 'km', type: 'auto' },
            { name: 'agency', type: 'auto' },
            { name: 'longitude', type: 'auto' },
            { name: 'latitude', type: 'auto' },
            { name: 'water', type: 'auto' }
        ]
    }
});
