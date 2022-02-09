import * as configHelper from "./config/config-helper.js";
import * as osmModule from "./osm-module/pick-data.js";
import * as scsGeneratorModule from "./scs-generator-module/scs-generator.js";
import * as fileSavingModule from "./file-saving-module/file-saving.js";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

/**
 * Method for collecting data:
 * You can put your custom collect method here
 * @param {Array<any>} areas Area where find OSM node
 * @param {Array<any>} tags Tags which must exist in OSM node
 * @param {Array<any>} pick Names of properties to pick from OSM node
 * @param {Function} filterFunc Filter function which applies for OSM nodes
 * @returns {Promise<Array<Array<any>>>} Promise with data from OSM
 */
const collectData = async (areas, tags, pick, filterFunc = () => true) => {
    let result = [];

    for (const area of areas) {
        console.log(`area name: ${area.name}, id: ${area.areaId} - pick data from OSM...`);
        let data = await osmModule.PickData(area.areaId, tags, pick);

        if (data) {
            console.log(`area name: ${area.name}, id: ${area.areaId} - filtering data from OSM...`);
            data = data.filter(filterFunc);
            result.push({ area, data });
        }
    }

    return result;
};

/**
 * Method for mapping data:
 * Map data before sent it to scs generator
 * You can put your custom mapper here
 * @param {Array<Array<any>>}} data data for mapping
 * @returns {Array<Array<any>>} result data
 */
const mapData = (data) => {
    const cyrillicToTranslit = new CyrillicToTranslit();

    return data.map(areaItem => {
        console.log(`area name: ${areaItem.area.name}, id: ${areaItem.area.areaId} - mapping data...`);

        return areaItem.data.map(item => {
            if (!item['name:en']) {
                item['name:en'] = cyrillicToTranslit.transform(item.name);
            }

            item.idtf = item['name:en'].replace(/[^a-zа-яё\s]/gi, '').toLowerCase().split(' ').join('_');
            item.regionIdtf = areaItem.area.name.toLowerCase().split(' ').join('_');

            return item;
        });
    });
};

/**
 * Method for generating scs and saving results in file system
 * @param {Array<Array<any>>} data 
 * @param {any} templates 
 */
const generateScs = (data, templates) => {
    console.log(`Generating SCS files...`);
    data.forEach(area => {
        area.forEach(item => {
            const scs = scsGeneratorModule.generateScsString(item, templates);
            fileSavingModule.saveToFile(item.regionIdtf, item.idtf, scs);
        });
    });
}

/**
 * Some kind of man
 */
(async () => {
    const tags = configHelper.getTags();

    const pick = configHelper.getPick();

    const areas = configHelper.getAreas();

    const templates = configHelper.getTemplates();

    const notMappedData = await collectData(areas, tags, pick, (item) => item);

    const data = mapData(notMappedData);

    generateScs(data, templates);
})();