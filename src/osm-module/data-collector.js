import { PickData } from "./pick-data.js";

/**
 * 
 * @param {any} areas 
 * @param {Array<any>} tags 
 * @param {Array<String>} pick 
 * @param {Function} mapFunc 
 * @returns {Promise<Array<any>>}
 */
export const collectData = async (areas, tags, pick, mapFunc = (item) => item) => {
    const result = [];

    for (const area of areas) {
        let data = await PickData(area.osmAreaId, tags, pick);

        if (data) {
            data = data.map(mapFunc);
            result.push({ area, data });
        }
    }

    return result;
};