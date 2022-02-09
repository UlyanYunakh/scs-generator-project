import * as configHelper from "./config-helper.js";
import { PickData } from "./osm-module/pick-data.js";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import * as fs from 'fs';
import { generateScsString } from "./scs-generator-module/main.js";

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
 * Method for saving content in file:
 * @param {String} folderName folder to save name
 * @param {String} fileName file name
 * @param {String} content file content
 * @returns {Promise<void>} void
 */
const saveToFile = async (folderName, fileName, content) => {
    let dirname = `out/${folderName}`;

    const dirPromise = new Promise((resolve, reject) => {
        fs.access(dirname, error => {
            if (error) {
                fs.mkdir(dirname, { recursive: true }, err => {
                    if (err) {
                        console.error(err);
                        reject("mkdir error");
                    }
                    resolve();
                });
            }
        });
    });

    dirPromise.then(() => {
        fs.writeFile(`out/${folderName}/${fileName}.scs`, content, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
};

/**
 * Method for generating scs and saving results in file system
 * @param {Array<Array<any>>} data 
 */
const generateScs = (data) => {
    data.forEach(area => {
        area.forEach(item => {
            const scs = generateScsString(item);
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

    generateScs(data);
})();