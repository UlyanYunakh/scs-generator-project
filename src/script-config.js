export const config = {
    osmTags: [
        {
            name: 'name',
        },
        {
            name: 'tourism',
            value: 'museum'
        }
    ],
    pick: [
        'name',
        'name:en',
        'phone',
        'email',
        'website',
    ],
    areas: [
        {
            name: 'Minsk region',
            osmAreaId: '3600059752',
        },
        {
            name: 'Grodno region',
            osmAreaId: '3600059275',
        },
        {
            name: 'Gomel region',
            osmAreaId: '3600059161',
        },
        {
            name: 'Mogilev region',
            osmAreaId: '3600059162',
        },
        {
            name: 'Vitebsk region',
            osmAreaId: '3600059506',
        },
        {
            name: 'Brest region',
            osmAreaId: '3600059189',
        },
    ],
    mainTemplate: (...args) => {
        let result = "";
        result += args[0] + " <- concept_museum;\n";

        return result;
    },
    propertyTemplates: [
        {
            osmPropertyName: 'phone',
            scsPropertyTemplate: (...args) => {
                return `=>nrel_phone_number:
                [${args[0]}]
                (*<-concept_phone_number;;*);`;
            },
        },
        {
            osmPropertyName: 'website',
            scsPropertyTemplate: (...args) => {
                return ``;
            },
        },
        {
            osmPropertyName: 'email',
            scsPropertyTemplate: (...args) => {
                return ``;
            },
        },
        {
            osmPropertyName: 'region',
            scsPropertyTemplate: (...args) => {
                return ``;
            },
        }
    ],
};