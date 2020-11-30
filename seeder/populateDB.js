const _ = require('lodash');
const path = require('path');
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const os = require('os');
const { exec } = require("child_process");
const mongoHostUrl = "127.0.0.1:27017";
let mongoImport = path.posix.basename('/usr/local/bin/mongoimport');
let parameters = '';

const database = "alpr";
const collection = [ { 
                        "name" : "users",
                        "jsonFile": "systemusers.json" },
                        { 
                        "name" : "test2",
                        "jsonFile": "alprcameras.json" } ];

const osPlatform = os.platform();

if( osPlatform === 'win32') {
    mongoImport = path.win32.normalize("C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongoimport.exe");
    _.forEach( collection, function (k) {
        parameters = `/h ${mongoHostUrl} /d ${database} /c ${k.name} /file ${k.jsonFile} /jsonArray`;
        exec(`"${mongoImport}" ${parameters}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
})
}

_.forEach( collection, function (k) {
    parameters = `-h ${mongoHostUrl} -d ${database} -c ${k.name} --file ${k.jsonFile} --jsonArray`;
    exec(`"${mongoImport}" ${parameters}`, (error, stdout, stderr) => {
if (error) {
    console.log(`error: ${error.message}`);
    return;
}
if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
}
console.log(`stdout: ${stdout}`);
});
})


async function hashPassword () {
    let user = findOne({"username" : qfreeadmin }).select("password");
    const salt = await bcrypt.genSalt(10);
    //user.password = await bcrypt.hash(user.password, salt);
    //const userDoc = await user.save();
    console.log(user);
}

hashPassword();


