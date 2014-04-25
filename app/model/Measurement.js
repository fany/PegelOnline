Ext.define('PegelOnline.model.Measurement', {
    extend : 'Ext.data.Model',

    config: {
        fields: [
            { name: 'timestamp', type: 'date'   },
            { name: 'value',     type: 'float'  }
        ]
    }
});
