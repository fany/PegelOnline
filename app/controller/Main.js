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
            waters   : 'waters'
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
            forwardAnim   = this.getAnims().forward,
            stations      = this.getStations(),
            stationsStore = Ext.getStore('stations'),
            stationsProxy = stationsStore.getProxy(),
            isLongList;

        stationsProxy.setUrl(
            stationsStore.getUrlPrefix() + record.get('shortname')
        );
        stationsStore.load(function (records, successful) {
            if (successful) {
                isLongList = records.length > 9;
                // stations.setGrouped(isLongList); // Führt zu Fehlern.
                stations.setIndexBar(isLongList);
            }
            main.animateActiveItem(stations, forwardAnim);
        });

        main.down('toolbar')
            .setTitle(
                'Stations for water ' +
                Ext.util.Format.htmlEncode(record.get('longname'))
            );

        this.getBack().show();
    }
});