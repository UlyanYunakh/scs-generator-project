/**
 * Method for SCS generation
 * @param {Array<any>} data
 * @param {any} templates 
 * @returns {String} scs content
 */
export const generateScsString = (data, templates) => {
    let scs = templates.mainTemplate(data.idtf, data['name:en'], data.name);

    const propertyTemplates = templates.propertyTemplates;
    
    propertyTemplates.forEach(template => {
        if (data[template.name]) {
            scs += template.template(data[template.name]);
        }
    });

    return scs + ";";
};

