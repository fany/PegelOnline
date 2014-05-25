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
            main                    : 'main',
            tabList                 : 'tabList',
            tabListStations         : 'tabList stations',
            tabListStationsBack     : 'tabList stations #back',
            tabListWaters           : 'tabList waters',
            tabListMeasurementsBack : 'tabList measurements #back',
            tabMap                  : 'tabMap',
            tabMapMap               : 'tabMap wmap',
            tabMapMeasurementsBack  : 'tabMap measurements #back'
        },

        control : {
            tabListWaters           : { disclose: 'onDiscloseWaters' },
            tabListStations         : { disclose: 'onDiscloseStations' },
            tabListStationsBack     : { tap: 'onTapTabListStationsBack' },
            tabListMeasurementsBack : { tap: 'onTapTabListMeasurementsBack' },
            tabMapMap               : { disclose: 'onDiscloseWMap' },
            tabMapMeasurementsBack  : { tap: 'onTapTabMapMeasurementsBack' }
        },

        views : [ 'Main' ],
    },

    onTapTabListMeasurementsBack: function () {
        // console.log('onTapTabListMeasurementsBack');
        this.getTabList().animateActiveItem(
            this.getTabListStations(),
            this.getAnims().back
        );
    },


    onTapTabListStationsBack: function () {
        // console.log('onTapTabListStationsBack');
        this.getTabList().animateActiveItem(
            this.getTabListWaters(),
            this.getAnims().back
        );
    },

    onTapTabMapMeasurementsBack: function () {
        // console.log('onTapTabMapMeasurementsBack');
        this.getTabMap().animateActiveItem(
            this.getTabMapMap(),
            this.getAnims().cover
        );
    },

    onDiscloseWaters: function (list, water) {
        // console.log('onDiscloseWaters');
        var forwardAnim   = this.getAnims().forward,
            longname      = water.get('longname'),
            shortname     = water.get('shortname'),
            setMasked     = this.getMain().setMasked,
            stations      = this.getTabListStations(),
            stationsStore = stations.getStore(),
            stationsProxy = stationsStore.getProxy(),
            tabList       = this.getTabList(),
            title         = longname;

        if (longname.toLocaleUpperCase() !== shortname.toLocaleUpperCase()) {
            title += ' (' + shortname + ')';
        }
        title = Ext.util.Format.htmlEncode(title);

        setMasked({
            xtype   : 'loadmask',
            message : 'Loading stations for ' + title + ' …'
        });
        stationsProxy.setUrl(
            stationsStore.getUrlPrefix() + '?waters=' + water.get('shortname')
        );
        stationsStore.load(function (records, operation, success) {
            setMasked(false);
            if (success) {
                tabList.animateActiveItem(stations, forwardAnim);
            }
            stations.down('title').setTitle(title);
        });
    },

    onDiscloseStations: function (list, station) {
        // console.log('onDiscloseStations');
        var backToStations = this.getTabListMeasurementsBack();
        this.displayMeasurements(
            station,
            this.getTabList(),
            this.getAnims().forward,
            function (water) {
                var waterLong  = water.get('longname'),
                    waterShort = water.get('shortname');
                backToStations.setText(
                    Ext.util.Format.htmlEncode(
                        waterLong.length > 5 &&
                        waterShort.toLocaleUpperCase() !==
                         waterLong.toLocaleUpperCase() ? waterShort : waterLong
                    )
                );
            }
        );
    },

    onDiscloseWMap: function (station) {
        // console.log('onDiscloseWMap');
        this.displayMeasurements(
            station,
            this.getTabMap(),
            this.getAnims().reveal
        );
    },

    displayMeasurements: function (station, tab, anim, cleanup) {
        var htmlEncode        = Ext.util.Format.htmlEncode,
            measurements      = tab.down('measurements'),
            measurementsStore = measurements.down('chart').getStore(),
            measurementsProxy = measurementsStore.getProxy(),
            setMasked         = this.getMain().setMasked,
            water             = Ext.create(
                                     'PegelOnline.model.Water',
                                     station.get('water')
                                 ),
            escStationName    = htmlEncode(station.get('shortname'));
            escWaterName      = htmlEncode(water.get('longname'));

        setMasked({
            xtype   : 'loadmask',
            message : 'Loading data for ' + escWaterName + ' / ' +
                      escStationName + ' …'
        });
        measurementsProxy.setUrl(
            measurementsStore.getUrlPrefix() +
            station.get('uuid')              +
            measurementsStore.getUrlSuffix()
        );
        measurementsStore.load(function (records, operation, success) {
            setMasked(false);
            if (success) {
                tab.animateActiveItem(measurements, anim);
                if (cleanup) {
                    cleanup(water);
                }
                measurements.down('title').setTitle(
                    '<small>' + escWaterName + '</small> /<br>' + escStationName
                );
            }
        });
    }
});
