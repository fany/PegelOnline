Ext.define('PegelOnline.view.Measurements', {
    extend   : 'Ext.chart.Chart',
    xtype    : 'measurements',

    requires: [
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
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
                type : 'time'
            }
        ]

    }
});
