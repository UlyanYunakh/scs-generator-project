import { config } from "../script-config.js";

export const generateScsString = (data) => {
    let scs = config.mainTemplate(data.idtf, data['name:en'], data.name);

    const propertyTemplates = config.propertyTemplates;
    propertyTemplates.forEach(template => {
        if (data[template.osmPropertyName]) {
            scs += template.scsPropertyTemplate(data[template.osmPropertyName]);
        }
    });
    return scs + ";";
};