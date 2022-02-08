import * as configHelper from "./config-helper.js";
import { PickData } from "./osm-module/pick-data.js";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import * as fs from 'fs';
import { ScsGenerator } from "./scs-generator-module/main.js";

/**
 * Method for collecting data:
 * This is supporting method, you can completely change it's content
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
        let data = await PickData(area.osmAreaId, tags, pick);

        if (data) {
            data = data.filter(filterFunc);
            result.push({ area, data });
        }
    }

    return result;
};

/**
 * Method for validation: 
 * You can put your custom validator here
 * @param {Array<Array<any>>} data data for validation validate
 * @returns {Array<Array<any>>} validated data
 */
const validateData = (data) => {
    return data;
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

    return data.map(areaItem => areaItem.data.map(item => {
        if (!item['name:en']) {
            item['name:en'] = cyrillicToTranslit.transform(item.name);
        }

        item.idtf = item['name:en'].replace(/[^a-zа-яё\s]/gi, '').toLowerCase().split(' ').join('_');
        item.regionIdtf = areaItem.area.name.toLowerCase().split(' ').join('_');

        return item;
    }));
};

/**
 * 
 * @param {*} folderName 
 * @param {*} fileName 
 * @param {*} content 
 */
const saveToFile = (folderName, fileName, content) => {
    let dirname = `out/${folderName}`;
    fs.access(dirname, (error) => {
        if (error) {
            fs.mkdir(dirname, { recursive: true }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
    });

    fs.writeFile(`out/${folderName}/${fileName}.scs`, content, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

const generateScs = (data) => {
    data.forEach(element => {
        element.data.forEach(item => {
            const scs = new ScsGenerator().GenerateScsString(item);
            saveToFile(item.regionIdtf, item.idtf, scs);
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

    const notValidatedData = await collectData(areas, tags, pick, (item) => item);

    const validatedData = validateData(notValidatedData);

    const data = mapData(validatedData);

    console.log(data);
})();