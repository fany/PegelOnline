Ext.define('PegelOnline.view.Map', {
    extend : 'Ext.Map',
    xtype  : 'wmap',

    requires :  [
        'Ext.util.Geolocation',
        'PegelOnline.Utils'
    ],

    config: {
        mapOptions : { zoom: 10 },
        useCurrentLocation : { autoUpdate: false },

        listeners: {
            maprender : 'onMapRender',
            single    : true
        }
    },

    onMapRender: function (me, map) {
        var stationsStore = Ext.getStore('stations'),
            stationsProxy = stationsStore.getProxy();
        stationsProxy.setUrl(stationsStore.getUrlPrefix());
        stationsStore.load(function (records, operation, success) {
            if (success) {
                stationsStore.each(function (item) {
                    var foldCase  = PegelOnline.Utils.foldCase,
                        latitude  = item.get('latitude'),
                        longitude = item.get('longitude'),
                        longname  = item.get('longname'),
                        maps      = google.maps,
                        marker,
                        station   = item;
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
                                var infowindow = new maps.InfoWindow({
                                    content:
                                        '<strong>' + longname + '</strong><br>' +
                                        foldCase(station.get('water').longname) +
                                        ' (@ ' + station.get('km') + ' km)<br>' +
                                        foldCase(station.get('agency'))
                                });
                                infowindow.open(map, marker);
                            }
                        );
                        maps.event.addListener(
                            marker,
                            'dblclick',
                            function () {
                                alert("double click");
                            }
                        );
                    }
                });
            }
        });
    }
});
