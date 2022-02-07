export const config = {
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
            osmPropertyName: 'phone',
            scsPropertyTemplate: (...args) => {
                let result = `\n=> nrel_phone_number:`;
                args.forEach(phone => {
                    result += `\n` +
                    `   [${phone}]\n` +
                    `   (* <- concept_phone_number;;*);`
                });
                return result;
            },
        },
        {
            osmPropertyName: 'site',
            scsPropertyTemplate: (...args) => {
                let result = `\n=> nrel_site:`;
                args.forEach(site => {
                    result += `\n` +
                        `   [${site}]\n` +
                        `   (*<-concept_site;;*);`
                });
                return result;
            },
        },
        {
            osmPropertyName: 'email',
            scsPropertyTemplate: (...args) => {
                let result = `\n=> nrel_email:`;
                args.forEach(email => {
                    result += `\n` +
                        `   [${email}]\n` +
                        `   (*<-concept_email;;*);`
                });
                return result;
            },
        },
        {
            osmPropertyName: 'region',
            scsPropertyTemplate: (...args) => {
                let result = `\n=> nrel_region:`;
                args.forEach(region => {
                    result += `\n` +
                        `   [${region}];`
                });
                return result;
            },
        }
    ],
};