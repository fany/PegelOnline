Ext.define('PegelOnline.store.Waters', {
    extend: 'Ext.data.Store',

    alias: 'store.waters',
    requires: [ 'PegelOnline.model.Water' ],

    config: {
        model: 'PegelOnline.model.Water',
        grouper: {
            groupFn: function (record) {
                return record.get('longname')[0];
            }
        },
        data: [
            {
              shortname: "ALLER",
              longname: "ALLER"
            },
            {
              shortname: "BSK",
              longname: "BERLIN-SPANDAUER-SCHIFFFAHRTSKANAL"
            },
            {
              shortname: "BODENSEE",
              longname: "BODENSEE"
            },
            {
              shortname: "Bützflether Süderelbe",
              longname: "BÜTZFLETHER SÜDERELBE"
            },
            {
              shortname: "DAW",
              longname: "DAHME-WASSERSTRASSE"
            },
            {
              shortname: "DHK",
              longname: "DATTELN-HAMM-KANAL"
            },
            {
              shortname: "DIEMEL",
              longname: "DIEMEL"
            },
            {
              shortname: "DONAU",
              longname: "DONAU"
            },
            {
              shortname: "DEK",
              longname: "DORTMUND-EMS-KANAL"
            },
            {
              shortname: "EDER",
              longname: "EDER"
            },
            {
              shortname: "EIDER",
              longname: "EIDER"
            },
            {
              shortname: "ELBE",
              longname: "ELBE"
            },
            {
              shortname: "EHK",
              longname: "ELBE-HAVEL-KANAL"
            },
            {
              shortname: "ESK",
              longname: "ELBESEITENKANAL"
            },
            {
              shortname: "EMS",
              longname: "EMS"
            },
            {
              shortname: "ESTE",
              longname: "ESTE"
            },
            {
              shortname: "Freiburger Hafenpriel",
              longname: "FREIBURGER HAFENPRIEL"
            },
            {
              shortname: "FULDA",
              longname: "FULDA"
            },
            {
              shortname: "HAMME",
              longname: "HAMME"
            },
            {
              shortname: "HOW",
              longname: "HAVEL-ODER-WASSERSTRASSE"
            },
            {
              shortname: "HvK",
              longname: "HAVELKANAL"
            },
            {
              shortname: "HUNTE",
              longname: "HUNTE"
            },
            {
              shortname: "ILM",
              longname: "ILM"
            },
            {
              shortname: "ILMENAU",
              longname: "ILMENAU"
            },
            {
              shortname: "ITTER_DIEMEL",
              longname: "ITTER ZUR DIEMEL"
            },
            {
              shortname: "ITTER EDER",
              longname: "ITTER ZUR EDER"
            },
            {
              shortname: "JADE",
              longname: "JADE"
            },
            {
              shortname: "Jizera",
              longname: "JIZERA"
            },
            {
              shortname: "KLEINES HAFF",
              longname: "KLEINES HAFF"
            },
            {
              shortname: "KRÜCKAU",
              longname: "KRÜCKAU"
            },
            {
              shortname: "KÜSTENKANAL",
              longname: "KÜSTENKANAL"
            },
            {
              shortname: "LAHN",
              longname: "LAHN"
            },
            {
              shortname: "LWK",
              longname: "LANDWEHRKANAL"
            },
            {
              shortname: "LEDA",
              longname: "LEDA"
            },
            {
              shortname: "LEINE",
              longname: "LEINE"
            },
            {
              shortname: "LESUM",
              longname: "LESUM"
            },
            {
              shortname: "LyG",
              longname: "LYCHENER GEWÄSSER"
            },
            {
              shortname: "LÜHE",
              longname: "LÜHE"
            },
            {
              shortname: "MAIN",
              longname: "MAIN"
            },
            {
              shortname: "MDK",
              longname: "MAIN-DONAU-KANAL"
            },
            {
              shortname: "MZK",
              longname: "MALZER KANAL"
            },
            {
              shortname: "MLK",
              longname: "MITTELLANDKANAL"
            },
            {
              shortname: "MOSEL",
              longname: "MOSEL"
            },
            {
              shortname: "MULDE",
              longname: "MULDE"
            },
            {
              shortname: "MGS",
              longname: "MÜGGELSPREE"
            },
            {
              shortname: "MEW",
              longname: "MÜRITZ-ELDE-WASSERSTRASSE"
            },
            {
              shortname: "MHW",
              longname: "MÜRITZ-HAVEL-WASSERSTRASSE"
            },
            {
              shortname: "NECKAR",
              longname: "NECKAR"
            },
            {
              shortname: "NSK",
              longname: "NEUHAUSER SPEISEKANAL"
            },
            {
              shortname: "NVK",
              longname: "NIEGRIPPER VERBINDUNGSKANAL"
            },
            {
              shortname: "Nord-Ostsee-Kanal",
              longname: "NORD-OSTSEE-KANAL"
            },
            {
              shortname: "NORDSEE",
              longname: "NORDSEE"
            },
            {
              shortname: "OHW",
              longname: "OBERE HAVEL-WASSERSTRASSE"
            },
            {
              shortname: "ODER",
              longname: "ODER"
            },
            {
              shortname: "EGER",
              longname: "OHRE"
            },
            {
              shortname: "OrK",
              longname: "ORANIENBURGER KANAL"
            },
            {
              shortname: "ORKE",
              longname: "ORKE"
            },
            {
              shortname: "Orlice",
              longname: "ORLICE"
            },
            {
              shortname: "OSTE",
              longname: "OSTE"
            },
            {
              shortname: "OSTSEE",
              longname: "OSTSEE"
            },
            {
              shortname: "PVK",
              longname: "PAREYER VERBINDUNGSKANAL"
            },
            {
              shortname: "PEENE",
              longname: "PEENE"
            },
            {
              shortname: "PINNAU",
              longname: "PINNAU"
            },
            {
              shortname: "PHv",
              longname: "POTSDAMER HAVEL"
            },
            {
              shortname: "RHEIN",
              longname: "RHEIN"
            },
            {
              shortname: "RHK",
              longname: "RHEIN-HERNE-KANAL"
            },
            {
              shortname: "RBG",
              longname: "RHEINSBERGER GEWÄSSER"
            },
            {
              shortname: "RVK",
              longname: "ROTHENSEER-VERBINDUNGSKANAL"
            },
            {
              shortname: "Ru",
              longname: "RUHR"
            },
            {
              shortname: "Ruthenstrom",
              longname: "RUTHENSTROM"
            },
            {
              shortname: "RÜG",
              longname: "RÜDERSDORFER GEWÄSSER"
            },
            {
              shortname: "SAALE",
              longname: "SAALE"
            },
            {
              shortname: "SAAR",
              longname: "SAAR"
            },
            {
              shortname: "SQF",
              longname: "SCHWEDTER QUERFAHRT"
            },
            {
              shortname: "Schwinge",
              longname: "SCHWINGE"
            },
            {
              shortname: "SOW",
              longname: "SPREE-ODER-WASSERSTRASSE"
            },
            {
              shortname: "SKH",
              longname: "STICHKANAL HILDESHEIM"
            },
            {
              shortname: "SKG",
              longname: "STORKOWER GEWAESSER"
            },
            {
              shortname: "STÖR",
              longname: "STÖR"
            },
            {
              shortname: "STW",
              longname: "STÖR-WASSERSTRASSE"
            },
            {
              shortname: "TeK",
              longname: "TELTOWKANAL"
            },
            {
              shortname: "TlG",
              longname: "TEMPLINER GEWÄSSER"
            },
            {
              shortname: "TRAVE",
              longname: "TRAVE"
            },
            {
              shortname: "TREENE",
              longname: "TREENE"
            },
            {
              shortname: "UHW",
              longname: "UNTERE HAVEL-WASSERSTRASSE"
            },
            {
              shortname: "VKH",
              longname: "VERBINDUNGSKANAL HOHENSAATEN"
            },
            {
              shortname: "MOLDAU",
              longname: "VLATAVA"
            },
            {
              shortname: "WARNOW",
              longname: "WARNOW"
            },
            {
              shortname: "WtG",
              longname: "WENTOW-GEWÄSSER"
            },
            {
              shortname: "WbG",
              longname: "WERBELLINER GEWÄSSER"
            },
            {
              shortname: "WERRA",
              longname: "WERRA"
            },
            {
              shortname: "WDK",
              longname: "WESEL-DATTELN-KANAL"
            },
            {
              shortname: "WESER",
              longname: "WESER"
            },
            {
              shortname: "WOD",
              longname: "WESTODER"
            },
            {
              shortname: "Wischhafener Süderelbe",
              longname: "WISCHHAFENER SÜDERELBE"
            },
            {
              shortname: "WÜMME",
              longname: "WÜMME"
            }
        ]
    }
});
