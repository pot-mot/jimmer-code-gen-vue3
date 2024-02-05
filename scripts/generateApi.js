import http from "http";
import fs from "fs";
import fse from "fs-extra";
import { v4 } from "uuid";
import os from "os";
import AdmZip from "adm-zip";

const sourceUrl = "http://localhost:8080/ts.zip";
const tmpFilePath = os.tmpdir() + "/" + v4() + ".zip";
const generatePath = "src/api/__generated";

console.log("Downloading " + sourceUrl + "...");

const tmpFile = fs.createWriteStream(tmpFilePath);

http.get(sourceUrl, (response) => {
    response.pipe(tmpFile);
    tmpFile.on("finish", () => {
        tmpFile.close();
        console.log("File save success: ", tmpFilePath);

        // Remove generatePath if it exists
        if (fs.existsSync(generatePath)) {
            console.log("Removing existing generatePath...");
            fse.removeSync(generatePath);
            console.log("Existing generatePath removed.");
        }

        // Unzip the file using adm-zip
        console.log("Unzipping the file...");
        const zip = new AdmZip(tmpFilePath, {});
        zip.extractAllTo(generatePath, true, false, undefined);
        console.log("File unzipped successfully.");

        // Remove the temporary file
        console.log("Removing temporary file...");
        fs.unlink(tmpFilePath, (err) => {
            if (err) {
                console.error("Error while removing temporary file:", err);
            } else {
                console.log("Temporary file removed.");
            }
        });
    });
});
