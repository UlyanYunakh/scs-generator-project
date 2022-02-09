import * as fs from 'fs';

/**
 * Method for saving content in file:
 * @param {String} folderName folder to save name
 * @param {String} fileName file name
 * @param {String} content file content
 * @returns {Promise<void>} void
 */
export const saveToFile = async (folderName, fileName, content) => {
    let dirname = `out/${folderName}`;

    const dirPromise = new Promise((resolve, reject) => {
        fs.access(dirname, error => {
            if (error) {
                fs.mkdir(dirname, { recursive: true }, err => {
                    if (err) {
                        console.error('fail to save files: ' + err.message);
                        reject("fail to save files");
                    }
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    });

    dirPromise.then(() => {
        fs.writeFile(`out/${folderName}/${fileName}.scs`, content, (err) => {
            if (err) {
                console.error('fail to save files: ' + err.message);
            }
        });
    });
};