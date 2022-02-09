export const config = {
    areas: [
        {
            name: 'Minsk region',
            areaId: '3600059752',
        },
        {
            name: 'Grodno region',
            areaId: '3600059275',
        },
        {
            name: 'Gomel region',
            areaId: '3600059161',
        },
        {
            name: 'Mogilev region',
            areaId: '3600059162',
        },
        {
            name: 'Vitebsk region',
            areaId: '3600059506',
        },
        {
            name: 'Brest region',
            areaId: '3600059189',
        },
    ],
    tags: [
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
    templates: {
        mainTemplate: (...args) => {
            let result =
                `${args[0]} <- concept_museum;\n` +
                `=> nrel_main_idtf:\n` +
                `   [${args[1]}]\n` +
                `   (* <- lang_en;; <- name_en;;*);\n` +
                `   [${args[2]}]\n` +
                `   (* <- lang_ru;; <- name_ru;; <- name;;*);`;
    
            return result;
        },
        propertyTemplates: [
            {
                name: 'phone',
                template: (...args) => {
                    let result = `\n=> nrel_phone_number:`;
                    args.forEach(phone => {
                        result += `\n` +
                        `   [${phone}]\n` +
                        `   (* <- concept_phone_number;;*);`;
                    });
                    return result;
                },
            },
            {
                name: 'website',
                template: (...args) => {
                    let result = `\n=> nrel_site:`;
                    args.forEach(site => {
                        result += `\n` +
                            `   [${site}]\n` +
                            `   (*<-concept_site;;*);`;
                    });
                    return result;
                },
            },
            {
                name: 'email',
                template: (...args) => {
                    let result = `\n=> nrel_email:`;
                    args.forEach(email => {
                        result += `\n` +
                            `   [${email}]\n` +
                            `   (*<-concept_email;;*);`;
                    });
                    return result;
                },
            },
            {
                name: 'regionIdtf',
                template: (...args) => {
                    let result = `\n=> nrel_region:`;
                    args.forEach(region => {
                        result += `\n` +
                            `   [${region}];`;
                    });
                    return result;
                },
            }
        ],
    },
};