export const generateScsString = (data, templates) => {
    let scs = templates.mainTemplate(data.idtf, data['name:en'], data.name);

    const propertyTemplates = templates.propertyTemplates;
    
    propertyTemplates.forEach(template => {
        if (data[template.name]) {
            scs += template.template(data[template.osmPropertyName]);
        }
    });

    return scs + ";";
};

