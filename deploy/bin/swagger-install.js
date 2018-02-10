const fs = require("fs-extra");
const path = require("path");

const sourcePath = "node_modules/swagger-ui-dist/";
const targetPath = "swagger/";

const swaggerAssets = [
    "swagger-ui-bundle.js",
    "swagger-ui-bundle.js.map",
    "swagger-ui.css",
    "swagger-ui.css.map"
];

function resolve (...parts) {
    return path.resolve(__dirname, "..", ...parts);
};

const source = swaggerAssets.map(file => resolve(sourcePath, file));
const target = swaggerAssets.map(file => resolve(targetPath, file));

Promise
    .all([
        ...target.map(file => fs.remove(file)),
        ...target.map((file, ndx) => fs.copy(source[ndx], file))
    ])
    .then(_ => console.log("copied swagger-ui assets!"))
    // print errors to the console
    .catch(console.error)
