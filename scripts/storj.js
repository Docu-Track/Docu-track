
require('dotenv').config()
const storj = require("uplink-nodejs");
const libUplink = new storj.Uplink();

var storjConfig = {
    // 1cCYAHeo6b3QziQe9B9VXKtgBUJ6D6ZbAovEvr2U4DqND9iGTmqrX37NQcugmjDmsgKHs6XbqRyr3RV2RKjFPSrYeQfqJT3mNB8SisU2VHx2DakGWvunL14Sf4v1zjoihQXgat9KdjynWXu6mH46fjEFbfiExXpZYf6byoxh6d3CDoxP1ujA5w22zVbuSB1uEz1Cev6kBRraJ3uyKyeKBWtrCvhuFXN6dhSBWx179qBwFhfH25mZBTJK56FbsCQyCWw2kyvRFzqJ
    apiKey: "sdsdsd",
    satelliteURL: "https://us1.storj.io:80",
    encryptionPassphrase: "train lava picture divorce planet frequent kick alpha federal taxi again marine",
    bucketName: "demo-bucket",
    uploadPath: "../script",
};

var localFullFileName = {
    src: "run.js",
    dest: "rundone.js",
}

//request access
libUplink.requestAccessWithPassphrase(storjConfig.satelliteURL, storjConfig.apiKey, storjConfig.encryptionPassphrase).then(access => {
    console.log(access)
    // Open project
    access.openProject().then(async (project) => {
        console.log(project)

        // Create File handler
        var uploadOptions = new storj.UploadOptions();
        uploadOptions.expires = 0;
        await project.uploadObject(storjConfig.bucketName, storjConfig.uploadPath, storjConfig.uploadOptions).then(async (upload) => {
            console.log(upload)
        }).catch((err) => {
            //some code//....
        });

        //Create buffer
        var size = {
            file: `${await fs.statSync(localFullFileName.src).size}`,
            toWrite: 0,
            actuallyWritten: 0,
            totalWritten: 0
        };
        //
        var buffer = new Buffer.alloc(BUFFER_SIZE);
        var loop = true;
        var bytesRead = 0;
        while (loop) {
            //
            size.toWrite = size.file - size.totalWritten;
            //
            if (size.toWrite > BUFFER_SIZE) {
                size.toWrite = BUFFER_SIZE;
            } else if (size.toWrite === 0) {
                break;
            }
            //
        }
        bytesRead = await fs.readSync(fileHandle, buffer, 0, size.toWrite, size.totalWritten);

        // Upload file
        await upload.write(buffer, bytesRead).then((writeResult) => {
            console.log("bytes written")
        }).catch((err) => {
            console.log(err)
        });

        // Commit Upload
        await upload.commit().then(() => {
            console.log("Upload Committed")
        }).catch((err) => {
            console.log(err)
        });

        // Close project
        await project.close().then(() => {
            console.log("project closed")
        }).catch((err) => {
            console.log(err)
        });

    }).catch((err) => {
        console.log(err)
    });
}).catch((err) => {
    console.log(err)
});