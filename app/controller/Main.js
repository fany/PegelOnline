Ext.define('PegelOnline.controller.Main', {
    extend : 'Ext.app.Controller',

    requires: [
        'Ext.util.Format',
        'PegelOnline.view.Main'
    ],

    config : {
        anims : {
            back : {
                type      : 'slide',
                direction : 'right'
            },
            forward : {
                type      : 'slide',
                direction : 'left'
            }
        },

        refs: {
            back     : '#back',
            main     : 'main',
            stations : 'stations',
            waters   : 'waters',
        },

        control : {
            back   : { tap: 'onBackTap' },
            waters : { disclose: 'onDisclose' },
        },

        views : [
            'Stations',
            'Waters'
        ]
    },

    onBackTap: function () {
        var main = this.getMain();
        main.animateActiveItem(this.getWaters(), this.getAnims().back);
        main.down('toolbar').setTitle('Waters');
        this.getBack().hide();
    },

    onDisclose: function (list, record) {
        var main          = this.getMain(),
            stationsStore = Ext.getStore('stations'),
            stationsProxy = stationsStore.getProxy();
        stationsProxy.setUrl(
            stationsStore.getUrlPrefix() + record.get('shortname')
        );
        stationsStore.load();
        main.animateActiveItem(this.getStations(), this.getAnims().forward);
        main.down('toolbar')
            .setTitle(
                'Stations for water ' +
                Ext.util.Format.htmlEncode(record.get('longname'))
            );
        this.getBack().show();
    }
});
