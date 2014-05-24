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
            measurements             : 'measurements',
            stations                 : 'stations',
            tabList                  : 'tabList',
            tabListMeasurementsBack  : 'tabList measurements #back',
            tabListMeasurementsChart : 'tabList measurements chart',
            tabListStationsBack      : 'tabList stations #back',
            tabMap                   : 'tabMap',
            tabMapMeasurements       : 'tabMap measurements',
            tabMapMeasurementsBack   : 'tabMap measurements #back',
            tabMapMeasurementsChart  : 'tabMap measurements chart',
            waters                   : 'waters',
            wmap                     : 'wmap'
        },

        control : {
            tabListMeasurementsBack: {
                tap      : 'onTapTabListMeasurementsBack'
            },

            tabListStationsBack: {
                tap      : 'onTapTabListStationsBack'
            },

            tabMapMeasurementsBack: {
                tap      : 'onTapMapMeasurementsBack'
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

        views : [ 'Main' ],

        currentWater : null
    },

    onTapTabListMeasurementsBack: function () {
        this.getTabList().animateActiveItem(
            this.getStations(),
            'pop'
        );
    },


    onTapTabListStationsBack: function () {
        this.getTabList().animateActiveItem(
            this.getWaters(),
            this.getAnims().back
        );
    },

    onTapTabMapMeasurementsBack: function () {
        this.getTabMap().animateActiveItem(
            this.getWMap(),
            this.getAnims().back
        );
    },

    onDiscloseWaters: function (list, water) {
        var forwardAnim   = this.getAnims().forward,
            longname      = water.get('longname'),
            shortname     = water.get('shortname'),
            stations      = this.getStations(),
            stationsStore = Ext.getStore('stations'),
            stationsProxy = stationsStore.getProxy(),
            tabList       = this.getTabList(),
            title;

        this.setCurrentWater(water);

        stationsProxy.setUrl(
            stationsStore.getUrlPrefix() + '?waters=' + water.get('shortname')
        );
        stationsStore.load(function (records, operation, success) {
            if (success) {
                tabList.animateActiveItem(stations, forwardAnim);
            }

            title = longname;
            if (longname.toLocaleUpperCase() !== shortname.toLocaleUpperCase()) {
                title += ' (' + shortname + ')';
            }
            stations.down('title').setTitle(Ext.util.Format.htmlEncode(title));
        });
    },

    onDiscloseStations: function (list, station) {
        var backToStations    = this.getTabListMeasurementsBack(),
            currentWater      = this.getCurrentWater(),
            currentWaterLong  = currentWater.get('longname'),
            currentWaterShort = currentWater.get('shortname'),
            forwardAnim       = this.getAnims().forward,
            htmlEncode        = Ext.util.Format.htmlEncode,
            measurements      = this.getMeasurements(),
            measurementsStore = this.getTabListMeasurementsChart().getStore(),
            measurementsProxy = measurementsStore.getProxy(),
            tabList           = this.getTabList();

        measurementsProxy.setUrl(
            measurementsStore.getUrlPrefix() +
            station.get('uuid')              +
            measurementsStore.getUrlSuffix()
        );
        measurementsStore.load(function (records, operation, success) {
            if (success) {
                tabList.animateActiveItem(measurements, forwardAnim);

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
        var backToMap         = this.getTabMapMeasurementsBack(),
            currentWater      = Ext.create(
                                    'PegelOnline.model.Water',
                                    station.get('water')
                                ),
            currentWaterLong  = currentWater.get('longname'),
            htmlEncode        = Ext.util.Format.htmlEncode,
            measurements      = this.getMeasurements(),
            measurementsStore = this.getTabMapMeasurementsChart().getStore(),
            measurementsProxy = measurementsStore.getProxy(),
            tabMap            = this.getTabMap();

        measurementsProxy.setUrl(
            measurementsStore.getUrlPrefix() +
            station.get('uuid')              +
            measurementsStore.getUrlSuffix()
        );
        measurementsStore.load(function (records, operation, success) {
            if (success) {
                tabMap.animateActiveItem(measurements, 'pop');
                measurements.down('title').setTitle(
                    '<small>' + currentWaterLong + '</small> /<br>' +
                    htmlEncode(station.get('shortname'))
                );
            }
        });
    }
});
