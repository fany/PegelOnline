Ext.define('PegelOnline.view.Measurements', {
    extend   : 'Ext.chart.Chart',
    xtype    : 'measurements',

    requires: [
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemInfo',
        'Ext.chart.interactions.PanZoom',
        'PegelOnline.store.Measurements'
    ],

    config: {
        store : { type: 'measurements' },

        series: [
            {
                type   : 'line',
                xField : 'timestamp',
                yField : 'value',

                style: {
                    fill   : 'rgba(0,40,170,0.42)',
                    stroke : 'black'
                }
            }
        ],

        axes: [
            {
                type     : 'numeric',
                position : 'left',
                title    : 'water level',

                grid: {
                    fill: '#efefef',
                    odd: {
                        fill: '#cdcdcd'
                    },
                    even: {
                        lineWidth: 3
                    }
                }
            },
            {
                type         : 'time',
                visibleRange : [0.9, 1]
            }
        ],

        interactions: [
            'panzoom',
            {
                type      : 'iteminfo',

                listeners: {
                    show: function (me, item, panel) {
                        panel.setHtml(
                            item.record.data.timestamp +
                            ':<br><strong>' +
                            item.record.data.value +
                            '</strong>'
                        );
                    }
                },

                panel: {
                    height : 150,
                    width  : 220,
                    style  : { 'text-align': 'center' },
                    items  : [
                        {
                            docked : 'top',
                            xtype  : 'toolbar',
                            title  : 'Water Level'
                        }
                    ]
                }
            }
        ]
    }
});
