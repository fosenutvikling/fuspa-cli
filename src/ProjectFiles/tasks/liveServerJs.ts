export const liveServerJs = (buildFolder) =>
    `
var liveServer = require("live-server");

var params = {
    port: 8080, // Set the server port. Defaults to 5501. 
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP. 
    root: "${buildFolder}", // Set root directory that's being served. Defaults to cwd. 
    open: true, // When false, it won't load your browser by default. 
    ignore: '', // comma-separated string for paths to ignore 
   // file: "index.html", // When set, serve this file for every 404 (useful for single-page applications) 
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec. 
    mount: [], // Mount a directory to a route. 
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots 
    middleware: [function (req, res, next) {
        next();
    }], // Takes an array of Connect-compatible middleware that are injected into the server middleware stack 
    browser: 'Chrome'
};
liveServer.start(params);
`;