import { CreateQuery } from "./create-query.js";
import _ from "lodash";

/**
 * 
 * @param {String} areaId Id of area where is search
 * @param {Array<any>} tags Tags which must exist in node
 * @param {Array<String>} pick Names of properties to pick from node tags
 * @returns {Promise<Array<any>>} Promise with array of object with picked tags
 */
export const PickData = (areaId, tags, pick) => {
    const query = CreateQuery(areaId, tags);

    return query.execute().then(
        (result) => {
            const data = result.data.elements.map(node => {
                return _.pick(node.tags, pick);
            });
            return data;
        },
        (error) => {
            console.error(error);
        });
};
