import { CreateQuery } from "./create-query.js";
import { config } from "./osm-config.js";
import _ from "lodash";

/**
 * 
 * @param {String} areaId Id of area where is search
 * @param {Array<any>} tags Tags which must exist in node
 * @param {Array<String>} pick Names of properties to pick from node tags
 * @returns {Promise<Array<any>>} Promise with array of object with picked tags
 */
export const PickData = (areaId, tags, pick, tryCount = 0) => {
    const query = CreateQuery(areaId, tags);

    return query.execute().then(
        (result) => {
            const data = result.data.elements.map(node => {
                return _.pick(node.tags, pick);
            });

            return data;
        },
        async () => {
            await new Promise(resolve => setTimeout(resolve(), config.timeOutBeforeRetry));
            console.error(`areaId:${areaId} - attempt ${tryCount + 1} fail: retrying query...`);

            return tryCount > config.retryCount ? [] : await PickData(areaId, tags, pick, ++tryCount);
        });
};
