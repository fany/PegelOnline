Ext.define('PegelOnline.view.Help', {
    extend : 'Ext.Container',
    xtype  : 'help',

    config: {
        items : [
            {
                docked : 'top',
                xtype  : 'toolbar',

                items: [
                    {
                        xtype : 'title',
                        title : 'About this app',
                        style : { 'text-align': 'left' }
                    }
                ]
            },
            {
                html:
                  '<p style="margin-bottom:1em">This app was made by '         +
                  'Martin H. Sluka &lt;<a href="mailto:Martin%20H.%20Sluka'    +
                  '%20&lt;iversity@martin.sluka.de&gt;">'                      +
                  'iversity@martin.sluka.de</a>&gt;.</p>'                      +
                  '<p style="margin-bottom:1em">It visualizes data '           +
                  ' provided by '                                              +
                  ' <a href="http://www.pegelonline.wsv.de/webservice/"'       +
                  ' style="color:inherit">PEGELONLINE WEBSERVICES</a> and '    +
                  ' thus enables you to view the development of the water '    +
                  ' level of many waters in Germany over the last days.</p>'   +
                  '<p style="margin-bottom:1em">From the main menu, please '   +
                  ' select the water you are interested in. You will then '    +
                  ' get a list of available measurement stations for this '    +
                  ' water. Upon chosing one of these, a graph showing the '    +
                  ' time curve of the water level will be displayed. You may ' +
                  ' drag this graph to see the data for previous days or '     +
                  ' zoom in by pinching to get a more detailed graph.</p>'     +
                  '<p style="margin-bottom:1em">I hope you enjoy using this '  +
                  ' app. Should you encounter any problems, please '           +
                  '<a href="mailto:Martin%20H.%20Sluka%20&lt;'                 +
                  'martin@sluka.de&gt;">report them to me</a>.</p>',
                padding: '1em'
            }
        ]
    }
});

