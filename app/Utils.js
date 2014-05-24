var namespace = Ext.define('PegelOnline.Utils', {}); // Make sencha cmd happy.

namespace.foldCase = function (string) {
    if (string.toLocaleUpperCase() === string) {
        string = string.replace(
            /[^- ._]{3,}/g,
            function (word) {
                if (
                    word !== 'WSA' &&
                    !~word.search(/[0-9]/) &&  // z. B. HOW/DGW1
                    ~word.search(/[AEIOYUÄÖÜ]/) // z. B. DFH, SHW; beachte: Sylt
                ) {
                    word = word.charAt(0) + word.slice(1).toLocaleLowerCase();
                }
                return word;
            }
        );
    }
    return string.replace(/\bST\./, 'St.')
                 .replace('Wasserstrasse', 'Wasserstraße')
                 .replace(' Auf ', ' auf ')
                 .replace(' Zur ', ' zur ');
}
