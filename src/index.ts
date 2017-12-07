require('source-map-support').install();
import * as commander from 'commander';
import { SpaProject } from './SpaProject';
import { IConfig } from './ProjectFiles';
import { envSlash } from './Functions';

const defaultConfig: IConfig = {
    engine: 'handlebars',
    container: 'container',
    name: 'spa-starter',
    mainFile: 'main.ts'
};

commander
    .version('0.1.0')
    .option('-N, --name [name]', 'Name of project', defaultConfig.name)
    .option('-f, --file [path]', 'set config path. defaults to `spa.options.js`', 'spa.options.js')
    .option('-e --engine [engine]', 'Set render engine', /^(handlebars)$/i, 'handlebars') // add more options /^(coke|pepsi|izze)$/i
    .option('-c --container [container]', 'DOM-id of element to append rendered html', 'container')
    .option('-m --main [main]', 'Entry point of application', 'main.ts')
    .parse(process.argv);


let config: IConfig = {
    engine: commander.engine,
    container: commander.container,
    name: <any>commander['name'],
    mainFile: commander.main
};

try {
    const loadedConfig: IConfig = require(process.cwd() + envSlash() + commander.file);

    config.engine = loadedConfig.engine || config.engine;
    config.container = loadedConfig.container || config.container;
    config.name = loadedConfig.name || config.name;
    config.mainFile = loadedConfig.mainFile || config.mainFile;
} catch (exception) {
    console.log('Couldn\'t locate config file, using default config');
}

console.log('Creating project with config: ', config);
const project = new SpaProject(config);
project.create();