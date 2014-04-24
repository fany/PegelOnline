Ext.define('PegelOnline.controller.Waters', {
    extend: 'Ext.app.Controller',

    requires: [ 'PegelOnline.view.Main' ],

    config : {
        control : {
            waters : {
                disclose: 'onDisclose'
            },
        },

        views : [
            'Waters',
        ]
    },

    onDisclose: function(list, record) {
        alert(record);
    }
});
