import { config } from "../script-config.js";

export function ScsGenerator() {
    /**
     * 
     * @param {any} data 
     * @returns {string}
     */
    this.GenerateFileFromData = (data) => {
        if (data.nameRu && data.nameEn){
            let scs = this.GenerateScsString(data);
            var fs = require("fs");
            const path = require("path");

            let dirname = `/../kb/${data.region}_museum`;
            fs.access(dirname, function(error){
                if (error) {
                    fs.mkdir(path.normalize(__dirname + dirname), { recursive: true }, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    });
                }
            });

            fs.open(path.normalize(`${dirname}/${data.id}.scs`), 'w', (err) => {
                if(err){
                    console.log("aaaaaaaaaaaaaaa");
                }
                console.log('File created');
            });
            return scs;
        }
        return;
    };

    this.GenerateScsString = (data) =>{
        let scs = config.mainTemplate(data.nameEn.toLowerCase().split(' ').join('_'), data.nameEn, data.nameRu);

        const propertyTemplates = config.propertyTemplates;
        propertyTemplates.forEach(template => {
            if (data[template.osmPropertyName]) {
                scs += template.scsPropertyTemplate(data[template.osmPropertyName]);
            }
        });

        return scs + ";";
    };

    this.FormatingDat = (data) =>{
        let id;
        return;
    };
}

const scs = new ScsGenerator().GenerateFileFromData(
    {
        nameEn: "museumName",
        nameRu: "museumName",
        email: "email",
        phone: "1283217893",
        site: "sdawyudb.com",
        region: "mainsk"
    }
);
console.log(scs);