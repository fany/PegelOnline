Ext.define('PegelOnline.controller.Main', {
    extend : 'Ext.app.Controller',

    requires: [
        'Ext.util.Format',
        'PegelOnline.view.Main'
    ],

    config : {
        anims : {
            back    : { type      : 'slide', direction : 'right' },
            flip    : 'flip',
            forward : { type      : 'slide', direction : 'left'  }
        },

        refs: {
            back         : '#back',
            helpButton   : '#help',
            helpPage     : 'help',
            main         : 'main',
            measurements : 'measurements',
            stations     : 'stations',
            waters       : 'waters'
        },

        control : {
            back       : { tap: 'onTapBack' },
            helpButton : { tap: 'onTapHelp' },
            waters     : { disclose: 'onDiscloseWaters' },
            stations   : { disclose: 'onDiscloseStations' },
        },

        views : [
            'Stations',
            'Waters'
        ],

        currentWater   : null
    },

    onTapBack: function () {
        var back         = this.getBack(),
            main         = this.getMain(),
            stations     = this.getStations();

        switch (main.getActiveItem()) {
          case this.getHelpPage():
            main.animateActiveItem(this.getWaters(), this.getAnims().flip);
            main.setTitle('Waters');
            back.hide();
            this.getHelpButton().show();
            break;
          case stations:
            main.animateActiveItem(this.getWaters(), this.getAnims().back);
            main.setTitle('Waters');
            back.hide();
            this.getHelpButton().show();
            break;
          case this.getMeasurements():
            main.animateActiveItem(stations, this.getAnims().back);
            main.restoreTitle();
            back.setText('Waters');
            break;
        }
    },

    onTapHelp: function () {
        var main = this.getMain();
        main.animateActiveItem(this.getHelpPage(), this.getAnims().flip);
        main.setTitle('About this app');
        this.getHelpButton().hide();
        this.getBack().show();
    },

    onDiscloseWaters: function (list, record) {
        var back          = this.getBack(),
            forwardAnim   = this.getAnims().forward,
            help          = this.getHelpButton(),
            main          = this.getMain(),
            stations      = this.getStations(),
            stationsStore = Ext.getStore('stations'),
            stationsProxy = stationsStore.getProxy(),
            longname      = record.get('longname'),
            shortname     = record.get('shortname'),
            title;

        this.setCurrentWater(record);

        stationsProxy.setUrl(
            stationsStore.getUrlPrefix() + record.get('shortname')
        );
        stationsStore.load(function (records, operation, success) {
            if (success) {
                main.animateActiveItem(stations, forwardAnim);
            }

            title = longname;
            if (longname.toLocaleUpperCase() !== shortname.toLocaleUpperCase()) {
                title += ' (' + shortname + ')';
            }
            main.setTitle(Ext.util.Format.htmlEncode(title));

            help.hide();
            back.show();
        });
    },

    onDiscloseStations: function (list, record) {
        var back              = this.getBack(),
            currentWater      = this.getCurrentWater(),
            currentWaterLong  = currentWater.get('longname'),
            currentWaterShort = currentWater.get('shortname'),
            forwardAnim       = this.getAnims().forward,
            htmlEncode        = Ext.util.Format.htmlEncode,
            main              = this.getMain(),
            measurements      = this.getMeasurements(),
            measurementsStore = Ext.getStore('measurements'),
            measurementsProxy = measurementsStore.getProxy();

        measurementsProxy.setUrl(
            measurementsStore.getUrlPrefix() +
            record.get('uuid')               +
            measurementsStore.getUrlSuffix()
        );
        measurementsStore.load(function (records, operation, success) {
            if (success) {
                main.animateActiveItem(measurements, forwardAnim);

                back.setText(
                    htmlEncode(
                        currentWaterLong.length > 5 &&
                        currentWaterShort.toLocaleUpperCase() !==
                         currentWaterLong.toLocaleUpperCase()
                        ? currentWaterShort
                        : currentWaterLong
                    )
                );
                main.setTitle(
                    '<small>' + currentWaterLong + '</small> /<br>' +
                    htmlEncode(record.get('shortname'))
                );
            }
        });
    }
});
