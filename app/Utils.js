var namespace = Ext.namespace('PegelOnline.Utils');

namespace.foldCase = function (string) {
    if (string.toLocaleUpperCase() === string) {
        string = string.replace(
            /[\wäöüÄÖÜß]{3,}/g,
            function (word) {
                return word.charAt(0) + word.slice(1).toLocaleLowerCase();
            }
        );
    }
    return string.replace('Wasserstrasse', 'Wasserstraße');
}
