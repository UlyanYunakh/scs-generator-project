import { config } from "../script-config.js";

export function ScsGenerator() {
    /**
     * 
     * @param {any} data 
     */
    this.GenerateFileFromData = (data) => {
        if (data.nameRu && data.nameEn){
            let scs = config.mainTemplate(data.nameEn.toLowerCase().split(' ').join('_'), data.nameEn, data.nameRu);

            const propertyTemplates = config.propertyTemplates;
            propertyTemplates.forEach(template => {
                if (data[template.osmPropertyName]) {
                    scs += template.scsPropertyTemplate(data[template.osmPropertyName]);
                }
            });

            return scs + ";";
        }

        return;
    };
}

const scs = new ScsGenerator().GenerateFileFromData(
    {
        nameEn: "museumName",
        nameRu: "museumName",
        email: "email",
        phone: "1283217893",
        site: "sdawyudb.com"
    }
);
console.log(scs);