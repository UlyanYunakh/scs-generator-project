import { config } from "./script-config.js";

export const getPick = () => {
    return config.pick;
};

export const getAreas = () => {
    return config.areas;
};

export const getTags = () => {
    return config.tags;
};

export const getTemplates = () => {
    return config.templates;
};
