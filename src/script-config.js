export const config = {
    mainTemplate: (value) => {
        return `main template with value ${value}`;
    },
    propertyTemplates: [
        {
            osmPropertyName: 'phone',
            scsPropertyTemplate: (value) => {
                return `scs template with value ${value}`;
            },
        },
        {
            osmPropertyName: 'site',
            scsPropertyTemplate: (value) => {
                return `scs template with value ${value}`;
            },
        },
        {
            osmPropertyName: 'email',
            scsPropertyTemplate: (value) => {
                return `scs template with value ${value}`;
            },
        },
        {
            osmPropertyName: 'region',
            scsPropertyTemplate: (value) => {
                return `scs template with value ${value}`;
            },
        }
    ],
};