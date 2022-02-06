import { config } from "../script-config.js";

export function ScsGenerator() {
    /**
     * 
     * @param {any} data 
     * @returns {string}
     */
    this.GenerateFileFromData = (data) => {
        const propertyTemplates = config.propertyTemplates;
        let scs = '';

        if (!data.name){
            return;
        }

        scs = config.mainTemplate(data.name);

        propertyTemplates.forEach(template => {
            if (data[template.osmPropertyName]) {
                scs += template.scsPropertyTemplate(data[template.osmPropertyName]);
            }
        });

        return scs;
    };
}

const scs = new ScsGenerator().GenerateFileFromData(
    {
        name: "museumName",
        email: "email",
    }
);
console.log(scs);