Ext.define('PegelOnline.model.Water', {
    extend   : 'Ext.data.Model',
    requires :  [ 'PegelOnline.Utils' ],

    config: {
        fields: [
            {
                name    : 'shortname',
                type    : 'string'
            },
            {
                name    : 'longname',
                type    : 'string',
                convert : function (value) {
                    return PegelOnline.Utils.foldCase(value);
                }
            }
        ]
    }
});
