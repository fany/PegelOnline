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

        infoWindows: []
    },

    onMapRender: function (me, map) {
        var stationsStore = Ext.create('PegelOnline.store.Stations'),
            stationsProxy = stationsStore.getProxy();
        stationsProxy.setUrl(stationsStore.getUrlPrefix());
        stationsStore.load(function (records, operation, success) {
            if (success) {
                stationsStore.each(function (item) {
                    var foldCase    = PegelOnline.Utils.foldCase,
                        infoWindows = me.getInfoWindows(),
                        latitude    = item.get('latitude'),
                        longitude   = item.get('longitude'),
                        longname    = item.get('longname'),
                        maps        = google.maps,
                        marker,
                        station     = item;
                    if (latitude && longitude) {
                        marker = new maps.Marker({
                            position : new maps.LatLng(latitude, longitude),
                            map      : map,
                            title    : longname // not suitable for touch devices
                        });
                        maps.event.addListener(
                            marker,
                            'click',
                            function () {
                                var infoWindow = new maps.InfoWindow({
                                    content:
                                        '<strong>' + longname + '</strong><br>' +
                                        foldCase(station.get('water').longname) +
                                        ' (@ ' + station.get('km') + ' km)<br>' +
                                        foldCase(station.get('agency'))
                                });
                                infoWindow.open(map, marker);
                                infoWindows.push(infoWindow);
                            }
                        );
                        maps.event.addListener(
                            marker,
                            'dblclick',
                            function () {
                                me.fireEvent('disclose', station);
                                infoWindows.forEach(function (infoWindow) {
                                    infoWindow.close();
                                });
                            }
                        );
                    }
                });
            }
        });
    }
});
