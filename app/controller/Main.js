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
            back         : '#back',
            main         : 'main',
            measurements : 'measurements',
            stations     : 'stations',
            waters       : 'waters'
        },

        control : {
            back     : { tap: 'onTapBack' },
            waters   : { disclose: 'onDiscloseWaters' },
            stations : { disclose: 'onDiscloseStations' },
        },

        views : [
            'Stations',
            'Waters'
        ]
    },

    onTapBack: function () {
        var back         = this.getBack(),
            backAnim     = this.getAnims().back,
            main         = this.getMain(),
            measurements = this.getMeasurements(),
            stations     = this.getStations(),
            titlebar     = main.down('toolbar');
        switch (main.getActiveItem()) {
          case stations:
            main.animateActiveItem(this.getWaters(), backAnim);
            titlebar.setTitle('Waters');
            back.hide();
            break;
          case measurements:
            main.animateActiveItem(stations, backAnim);
            titlebar.setTitle(back.getText());
            back.setText('Waters');
            break;
        }
    },

    onDiscloseWaters: function (list, record) {
        var forwardAnim   = this.getAnims().forward,
            main          = this.getMain(),
            stations      = this.getStations(),
            stationsStore = Ext.getStore('stations'),
            stationsProxy = stationsStore.getProxy(),
            isLongList;

        stationsProxy.setUrl(
            stationsStore.getUrlPrefix() + record.get('shortname')
        );
        stationsStore.load(function (records, successful) {
            if (successful) {
                main.animateActiveItem(stations, forwardAnim);
            }
        });

        main.down('toolbar')
            .setTitle(Ext.util.Format.htmlEncode(record.get('shortname')));

        this.getBack().show();
    },

    onDiscloseStations: function (list, record) {
        var control           = this.getControl(),
            forwardAnim       = this.getAnims().forward,
            main              = this.getMain(),
            measurements      = this.getMeasurements(),
            measurementsStore = Ext.getStore('measurements'),
            measurementsProxy = measurementsStore.getProxy(),
            titlebar          = main.down('toolbar');

        measurementsProxy.setUrl(
            measurementsStore.getUrlPrefix() +
            record.get('uuid')               +
            measurementsStore.getUrlSuffix()
        );
        measurementsStore.load(function (records, successful) {
            if (successful) {
                main.animateActiveItem(measurements, forwardAnim);
            }
        });

        this.getBack().setText(titlebar.getTitle().getHtml());
        titlebar.setTitle(Ext.util.Format.htmlEncode(record.get('shortname')));
    }
});
