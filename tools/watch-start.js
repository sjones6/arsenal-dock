const fs = require("fs");
const {join} = require("path");
const cwd = process.cwd();
const {red,greenBright} = require("chalk");

let app;
let starting = false;
let last;

const handleErr = function(err) {
    starting = false;
    console.error(red(`Error received attempting to start application: ${err.message}${err.stack}\n`));
    console.error(red("Waiting for changes...\n"));
}

// Handle any uncaught exception
process.on("uncaughtException", handleErr);

const run = function() {

    // Don't restart while start in progress
    if (starting) {
        return;
    }

    // Debounce
    if (last && (Date.now() - last) <= 2000) {
        return;
    }
    last = Date.now();

    // Shutdown if we've already started
    if (app) {
        app.shutdown();
        app = null;
    }

    // Empty out module cache
    Object.keys(require.cache).forEach(dep => {
        delete require.cache[dep];
    });

    // Grab the app and start it up.
    app = require(join(cwd, "index.js"));

    try {
        starting = true;
        app.bootstrap()
            .then(() => {
                app.run();
                starting = false;
                console.log(greenBright(`App started; listening on ${process.env.PORT}\n\n`));
            });
    } catch (err) {
        handleErr(err);
    }
};

fs.readdir(cwd, (err, files) => {
    files
        .filter(file => !/node_modules/.test(file))
        .forEach(file => {
            if (file.indexOf(".") >= 0 && /\w+/.test(file)) {
                fs.watch(file, run);
            } else {
                fs.watch(file, {recursive: true}, run);
            }
        });
    
    // Start application after watcher applied
    run();
});