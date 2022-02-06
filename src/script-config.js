export const config = {
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