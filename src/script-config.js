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
    areas: [
        {
            name: 'Minsk region',
            osmAreaId: '3600059752',
            subAreas: [
                {
                    name: 'Minsk',
                    osmAreaId: '3600059195',
                }
            ],
        },
        {
            name: 'Grodno region',
            osmAreaId: '3600059275',
            subAreas: [
                {
                    name: 'Grodno',
                    osmAreaId: '3600130921'
                }
            ]
        },
        {
            name: 'Gomel region',
            osmAreaId: '3600059161',
            subAreas: [
                {
                    name: 'Gomel',
                    osmAreaId: '3600163244'
                }
            ]
        },
        {
            name: 'Mogilev region',
            osmAreaId: '3600059162',
            subAreas: [
                {
                    name: 'Mogilev',
                    osmAreaId: '3600062145'
                }
            ]
        },
        {
            name: 'Vitebsk region',
            osmAreaId: '3600059506',
            subAreas: [
                {
                    name: 'Vitebsk',
                    osmAreaId: '3606825777'
                }
            ]
        },
        {
            name: 'Brest region',
            osmAreaId: '3600059189',
            subAreas: [
                {
                    name: 'Brest',
                    osmAreaId: '3600072615'
                }
            ]
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
            osmPropertyName: 'site',
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