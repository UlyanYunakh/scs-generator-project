import { OSMQuery } from "@toriyama/osmql";

export function QueryConstructor() {
    /**
     * 
     * @param {string} areaId 
     * @param {Array<any>} tags 
     * @returns {OSMQuery}
     */
    this.CreateQuery = (areaId, tags) => {
        const tagsString = tags.map(tag => {
            if (!tag.name) {
                throw "Tag must have name";
            }
            return tag.value ? `[${tag.name}=${tag.value}]` : `[${tag.name}]`;
        }).join('');

        let query = `area(id:${areaId})->.searchArea;(node${tagsString}(area.searchArea););out;`;

        return new OSMQuery().fromQLString(query);
    };
}