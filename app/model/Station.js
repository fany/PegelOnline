Ext.define('PegelOnline.model.Station', {
    extend   : 'Ext.data.Model',
    requires :  [ 'PegelOnline.Utils' ],

    config: {
        fields: [
            {
                name    : 'uuid',
                type    : 'string'
            },
            {
                name    : 'number',
                type    : 'int'
            },
            {
                name    : 'shortname',
                type    : 'string',
                convert : function (value) {
                    return PegelOnline.Utils.foldCase(value);
                }

            },
            {
                name    : 'longname',
                type    : 'string',
                convert : function (value) {
                    return PegelOnline.Utils.foldCase(value);
                }
            },
            {
                name    : 'km',
                type    : 'float'
            },
            {
                name    : 'agency',
                type    : 'string'
            },
            {
                name    : 'longitude',
                type    : 'float'
            },
            {
                name    : 'latitude',
                type    : 'float'
            },
            {
                name    : 'water',
                type    : 'auto'
            }
        ]
    }
});
