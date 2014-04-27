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
            stations     = this.getStations();

        switch (main.getActiveItem()) {
          case stations:
            main.animateActiveItem(this.getWaters(), backAnim);
            main.setTitle('Waters');
            back.hide();
            break;
          case measurements:
            main.animateActiveItem(stations, backAnim);
            main.setTitle(back.getText());
            back.setText('Waters');
            break;
        }
    },

    onDiscloseWaters: function (list, record) {
        var forwardAnim   = this.getAnims().forward,
            main          = this.getMain(),
            stations      = this.getStations(),
            stationsStore = Ext.getStore('stations'),
            stationsProxy = stationsStore.getProxy();

        stationsProxy.setUrl(
            stationsStore.getUrlPrefix() + record.get('shortname')
        );
        stationsStore.load(function (records, successful) {
            if (successful) {
                main.animateActiveItem(stations, forwardAnim);
            }
        });

        main.setTitle(Ext.util.Format.htmlEncode(record.get('shortname')));

        this.getBack().show();
    },

    onDiscloseStations: function (list, record) {
        var forwardAnim       = this.getAnims().forward,
            main              = this.getMain(),
            measurements      = this.getMeasurements(),
            measurementsStore = Ext.getStore('measurements'),
            measurementsProxy = measurementsStore.getProxy();

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

        this.getBack().setText(main.getTitle());
        main.setTitle(Ext.util.Format.htmlEncode(record.get('shortname')));
    }
});
