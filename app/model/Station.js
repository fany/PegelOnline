Ext.define('PegelOnline.model.Station', {
    extend : 'Ext.data.Model',

    config: {
        fields: [
            { name: 'uuid',      type: 'string' },
            { name: 'number',    type: 'int'    },
            { name: 'shortname', type: 'string' },
            { name: 'longname',  type: 'string' },
            { name: 'km',        type: 'float'  },
            { name: 'agency',    type: 'string' },
            { name: 'longitude', type: 'float'  },
            { name: 'latitude',  type: 'float'  },
            { name: 'water',     type: 'auto'   }
        ]
    }
});
