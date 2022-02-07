import { config } from "./script-config.js";

export const getPick = () => {
    return config.propertyTemplates.map(item => item.osmPropertyName);
};

export const getAreas = () => {
    return config.areas;
};

export const getTags = () => {
    return config.osmTags;
};