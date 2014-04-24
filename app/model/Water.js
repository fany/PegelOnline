Ext.define('PegelOnline.model.Water', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'shortname', type: 'string' },
            { name: 'longname', type: 'string' }
        ]
    }
});
