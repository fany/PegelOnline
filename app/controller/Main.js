Ext.define('PegelOnline.controller.Main', {
    extend : 'Ext.app.Controller',

    requires: [
        'Ext.util.Format',
        'PegelOnline.view.Main'
    ],

    config : {
        anims : {
            back    : { type: 'slide', direction: 'right' },
            forward : { type: 'slide', direction: 'left'  }
        },

        refs: {
            backToStations : '#backToStations',
            backToWaters   : '#backToWaters',
            helpPage       : 'help',
            main           : 'main',
            measurements   : 'measurements',
            stations       : 'stations',
            waters         : 'waters',
            wmap           : 'wmap'
        },

        control : {
            backToStations: {
                tap      : 'onTapBackToStations'
            },

            backToWaters: {
                tap      : 'onTapBackToWaters'
            },

            waters: {
                disclose : 'onDiscloseWaters'
            },

            stations: {
                disclose : 'onDiscloseStations'
            },

            wmap: {
                disclose : 'onDiscloseWMap'
            }
        },

        views : [
            'Map',
            'Measurements',
            'Stations',
            'Waters'
        ],

        currentWater   : null
    },

    onTapBackToStations: function () {
        this.getMain().animateActiveItem(
            this.getStations(),
            this.getAnims().back
        );
    },


    onTapBackToWaters: function () {
        this.getMain().animateActiveItem(
            this.getWaters(),
            this.getAnims().back
        );
    },

    onDiscloseWaters: function (list, water) {
        var forwardAnim   = this.getAnims().forward,
            main          = this.getMain(),
            stations      = this.getStations(),
            stationsStore = Ext.getStore('stations'),
            stationsProxy = stationsStore.getProxy(),
            longname      = water.get('longname'),
            shortname     = water.get('shortname'),
            title;

        this.setCurrentWater(water);

        stationsProxy.setUrl(
            stationsStore.getUrlPrefix() + '?waters=' + water.get('shortname')
        );
        stationsStore.load(function (records, operation, success) {
            if (success) {
                main.animateActiveItem(stations, forwardAnim);
            }

            title = longname;
            if (longname.toLocaleUpperCase() !== shortname.toLocaleUpperCase()) {
                title += ' (' + shortname + ')';
            }
            stations.down('title').setTitle(Ext.util.Format.htmlEncode(title));
        });
    },

    onDiscloseStations: function (list, station) {
        var backToStations    = this.getBackToStations(),
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
            station.get('uuid')              +
            measurementsStore.getUrlSuffix()
        );
        measurementsStore.load(function (records, operation, success) {
            if (success) {
                main.animateActiveItem(measurements, forwardAnim);

                backToStations.setText(
                    htmlEncode(
                        currentWaterLong.length > 5 &&
                        currentWaterShort.toLocaleUpperCase() !==
                         currentWaterLong.toLocaleUpperCase()
                        ? currentWaterShort
                        : currentWaterLong
                    )
                );
                measurements.down('title').setTitle(
                    '<small>' + currentWaterLong + '</small> /<br>' +
                    htmlEncode(station.get('shortname'))
                );
            }
        });
    },

    onDiscloseWMap: function (list, station) {
        var backToStations    = this.getBackToStations(),
            currentWater      = Ext.create(
                                    'PegelOnline.model.Water',
                                    station.get('water')
                                ),
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
            station.get('uuid')              +
            measurementsStore.getUrlSuffix()
        );
        measurementsStore.load(function (records, operation, success) {
            if (success) {
                main.animateActiveItem(measurements, forwardAnim);

                backToStations.setText(
                    htmlEncode(
                        currentWaterLong.length > 5 &&
                        currentWaterShort.toLocaleUpperCase() !==
                         currentWaterLong.toLocaleUpperCase()
                        ? currentWaterShort
                        : currentWaterLong
                    )
                );
                measurements.down('title').setTitle(
                    '<small>' + currentWaterLong + '</small> /<br>' +
                    htmlEncode(station.get('shortname'))
                );
            }
        });
    }
});
