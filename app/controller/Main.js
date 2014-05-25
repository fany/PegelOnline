Ext.define('PegelOnline.controller.Main', {
    extend : 'Ext.app.Controller',

    requires: [
        'Ext.util.Format',
        'PegelOnline.view.Main'
    ],

    config : {
        anims : {
            cover   : { type: 'cover',  direction: 'up'    },
            back    : { type: 'slide',  direction: 'right' },
            forward : { type: 'slide',  direction: 'left'  },
            reveal  : { type: 'reveal', direction: 'down'  }
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
            wMap                     : 'wmap'
        },

        control : {
            tabListMeasurementsBack: {
                tap      : 'onTapTabListMeasurementsBack'
            },

            tabListStationsBack: {
                tap      : 'onTapTabListStationsBack'
            },

            tabMapMeasurementsBack: {
                tap      : 'onTapTabMapMeasurementsBack'
            },

            waters: {
                disclose : 'onDiscloseWaters'
            },

            stations: {
                disclose : 'onDiscloseStations'
            },

            wMap: {
                disclose : 'onDiscloseWMap'
            }
        },

        views : [ 'Main' ],

        currentWater : null
    },

    onTapTabListMeasurementsBack: function () {
        // console.log('onTapTabListMeasurementsBack');
        this.getTabList().animateActiveItem(
            this.getStations(),
            this.getAnims().back
        );
    },


    onTapTabListStationsBack: function () {
        // console.log('onTapTabListStationsBack');
        this.getTabList().animateActiveItem(
            this.getWaters(),
            this.getAnims().back
        );
    },

    onTapTabMapMeasurementsBack: function () {
        // console.log('onTapTabMapMeasurementsBack');
        this.getTabMap().animateActiveItem(
            this.getWMap(),
            this.getAnims().cover
        );
    },

    onDiscloseWaters: function (list, water) {
        // console.log('onDiscloseWaters');
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
        // console.log('onDiscloseStations');
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
        // console.log('onDiscloseWMap');
        var currentWater      = Ext.create(
                                    'PegelOnline.model.Water',
                                    station.get('water')
                                ),
            currentWaterLong  = currentWater.get('longname'),
            htmlEncode        = Ext.util.Format.htmlEncode,
            measurements      = this.getMeasurements(),
            measurementsStore = this.getTabMapMeasurementsChart().getStore(),
            measurementsProxy = measurementsStore.getProxy(),
            revealAnim        = this.getAnims().reveal,
            tabMap            = this.getTabMap();

        measurementsProxy.setUrl(
            measurementsStore.getUrlPrefix() +
            station.get('uuid')              +
            measurementsStore.getUrlSuffix()
        );
        measurementsStore.load(function (records, operation, success) {
            if (success) {
                tabMap.animateActiveItem(measurements, revealAnim);
                measurements.down('title').setTitle(
                    '<small>' + currentWaterLong + '</small> /<br>' +
                    htmlEncode(station.get('shortname'))
                );
            }
        });
    }
});
