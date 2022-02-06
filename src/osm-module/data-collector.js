import { OSMQuery } from "@toriyama/osmql";
import { QueryConstructor } from "../osm-module/query-constructor.js";


export function DataCollector () {
    this.Collect = (areaId, tags) => {
        if (!areaId) {
            throw "Specify aredId";
        }
    
        if (!tags) {
            throw "Specify tags";
        }
    
        const constructor = new QueryConstructor();
        const query = constructor.CreateQuery(areaId, tags);
        // const osmQuery = new OSMQuery();
        // const query = osmQuery.fromQLString(
        //     "area(id:3600059752)->.searchArea;( node[tourism=museum][name](area.searchArea););out;"
        // );
    
        // return query.execute().then(
        //     (result) => {
        //         const geojson = result.toGeoJSON();
        //         console.log(geojson);
        //     },
        //     (error) => {
        //         console.error(error);
        //     });
    };
}