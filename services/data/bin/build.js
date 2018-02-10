process.env.NODE_ENV = "production";

const path = require("path");
const fs = require("fs-extra");
const archiver = require("archiver");
const webpack = require("webpack");
const config = require("./webpack.config");
const tmp = path.join(__dirname, "tmp");
const writePath = path.resolve(__dirname, "..", "dist", "bundle.zip");

webpack(config, function (err, stats) {
    if (err || stats.hasErrors()) {
        console.error("Build failed with errors.");
        process.exit(1);
    }
    console.log("archiving...");
    fs
        .emptyDir(tmp)
        .then(_ => new Promise((resolve, reject) => {
            const output = fs.createWriteStream(writePath);
            const bundle = archiver("zip", {
                zlib: {
                    level: 9
                }
            });
            bundle.pipe(output);
            bundle.file(path.resolve(__dirname, "..", "dist", "bundle.js"), {
                name: "index.js"
            });
            bundle.finalize();
            bundle.on("warning", reject);
            bundle.on("error", reject);
            output.on("close", () => {
                console.log("success!");
                resolve();
            });
        }))
        .then(_ => fs.remove(tmp))
        .catch(console.error);
});
