Ext.define('PegelOnline.view.Waters', {
    extend   : 'Ext.dataview.List',
    xtype    : 'waters',
    requires : [
        'Ext.Title',
        'Ext.Toolbar',
        'PegelOnline.store.Waters'
    ],

    config: {
        itemTpl          : '{longname}',
        store            : { type : 'waters' },
        grouped          : true,
        indexBar         : true,
        onItemDisclosure : true,

        items: [
            {
                docked : 'top',
                xtype  : 'toolbar',

                items: [
                    {
                        xtype : 'title',
                        title : 'Waters',
                        style : { 'text-align': 'left' }
                    }
                ]
            }
        ]
    }
});
