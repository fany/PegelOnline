Ext.define('PegelOnline.store.Measurements', {
    alias   : 'store.measurements',
    extend  : 'Ext.data.Store',

    requires: [
        'Ext.MessageBox',
        'Ext.JSON',
        'Ext.util.Format',
        'PegelOnline.model.Measurement'
    ],

    config: {
        storeId : 'measurements',
        model   : 'PegelOnline.model.Measurement',
        proxy: {
            type                : 'ajax',
            useDefaultXhrHeader : false,
            reader              : { type: 'json' },
            listeners: {
                exception: function(proxy, response) { // , operation) {
                    var responseText = Ext.JSON.decode(response.responseText);
                    Ext.Msg.alert(
                        'Error loading data from server',
                        '<p>' +
                        Ext.util.Format.htmlEncode(
                            response.status + ' ' + response.statusText
                        ) +
                        '</p><p style="font-size:small;line-height:1em">(' +
                        Ext.util.Format.htmlEncode(responseText.message) +
                        ')</p><hr><p>Please try another station!</p>'
                    );
                }
            }
        },

        urlPrefix : '//www.pegelonline.wsv.de' +
                    '/webservices/rest-api/v2/stations/',
        urlSuffix : '/W/measurements.json'
    }
});
