import { OSMQuery } from "@toriyama/osmql";

/**
 * 
 * @param {String} areaId Id of area where is search
 * @param {Array<any>} tags Tags which must exist in node
 * @returns {OSMQuery} OSMQuery to execute
 */
export const CreateQuery = (areaId, tags) => {
    const tagsString = tags.map(tag => {
        if (!tag.name) {
            throw "Tag must have name";
        }
        return tag.value ? `[${tag.name}=${tag.value}]` : `[${tag.name}]`;
    }).join('');

    let query = `area(id:${areaId})->.searchArea;(node${tagsString}(area.searchArea););out;`;

    return new OSMQuery().fromQLString(query);
};