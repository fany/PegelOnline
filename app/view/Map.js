Ext.define('PegelOnline.view.Map', {
    extend : 'Ext.Map',
    xtype  : 'wmap',

    requires :  [
        'Ext.Title',
        'Ext.Toolbar',
        'PegelOnline.store.Stations',
        'PegelOnline.Utils'
    ],

    config: {
        mapOptions         : { zoom: 9 },
        useCurrentLocation : { autoUpdate: false },

        items: [
            {
                docked : 'top',
                xtype  : 'toolbar',

                items: [
                    {
                        xtype : 'title',
                        title : 'Measurement stations',
                        style : { 'text-align': 'left' }
                    }
                ]
            }
        ],

        listeners: {
            maprender : 'onMapRender',
            single    : true
        },

        infoWindow : null
    },

    onMapRender: function (me, map) {
        var setMasked     = me.setMasked,
            stationsStore = Ext.create('PegelOnline.store.Stations'),
            stationsProxy = stationsStore.getProxy();

        setMasked({
            xtype   : 'loadmask',
            message : 'Loading map and stations …'
        });

        stationsProxy.setUrl(stationsStore.getUrlPrefix());
        stationsStore.load(function (records, operation, success) {
            var foldCase      = PegelOnline.Utils.foldCase,
                geo           = me.getGeo(),
                latitude      = geo.getLatitude(),
                longitude     = geo.getLongitude(),
                maps          = google.maps,
                minLat,
                maxLat,
                minLng,
                maxLng;

            if (success) {
                stationsStore.each(function (item) {
                    var station     = item,
                        latitude    = station.get('latitude'),
                        longitude   = station.get('longitude'),
                        longname    = station.get('longname'),
                        marker;

                    if (latitude && longitude) {
                        if (minLat === undefined || minLat > latitude) {
                            minLat = latitude;
                        }
                        if (maxLat === undefined || maxLat < latitude) {
                            maxLat = latitude;
                        }
                        if (minLng === undefined || minLng > longitude) {
                            minLng = longitude;
                        }
                        if (maxLng === undefined || maxLng < longitude) {
                            maxLng = longitude;
                        }

                        marker = new maps.Marker({
                            animation : maps.Animation.DROP,
                            position  : new maps.LatLng(latitude, longitude),
                            map       : map,
                            title     : longname // not for touch devices
                        });
                        maps.event.addListener(
                            marker,
                            'click',
                            function () {
                                var infoWindow = me.getInfoWindow();
                                if (infoWindow) {
                                    infoWindow.close();
                                }
                                infoWindow = new maps.InfoWindow({
                                    content:
                                        foldCase(station.get('water').longname) +
                                        ' /<br><strong>' + longname +
                                        '</strong> (@ ' + station.get('km') +
                                        ' km)<br>' +
                                        foldCase(station.get('agency')) +
                                        '<br><br><i>(Double-tap marker to ' +
                                        'display<br>graph of water level)</i>'
                                });
                                infoWindow.open(map, marker);
                                me.setInfoWindow(infoWindow);
                            }
                        );
                        maps.event.addListener(
                            marker,
                            'dblclick',
                            function () {
                                var infoWindow = me.getInfoWindow();
                                me.fireEvent('disclose', station);
                                if (infoWindow) {
                                    infoWindow.close();
                                    me.setInfoWindow(null);
                                }
                            }
                        );
                    }
                });

                // Falls Standort nicht ermittelbar oder außerhalb des
                // Datenbereichs, Mitte des Datenbereichs anzeigen:
                if (
                    latitude === null  || longitude === null ||
                    latitude  < minLat || latitude  > maxLat ||
                    longitude < minLng || longitude > maxLng
                ) {
                    me.setMapCenter({
                        latitude  : (minLat + maxLat) / 2,
                        longitude : (minLng + maxLng) / 2
                    });
                    map.setZoom(map.getZoom() - 1);
                }
            }

            setMasked(false);
        });
    }
});
