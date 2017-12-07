import * as fs from 'fs';
import { Main } from './ProjectFiles/Main';
import { tsconfig } from './ProjectFiles/tsconfig';
import { envSlash, createFolder, IFileContent } from './Functions';

// Engines
import { iEngine } from './Engines/iEngine';
import { Handlebars } from './Engines/Handlebars/Handlebars';

// tasks
import { liveServerJs } from './ProjectFiles/tasks/liveServerJs';
import { webpackJs } from './ProjectFiles/tasks/wepackJs';
import { baseJs } from './ProjectFiles/tasks/baseJs';
import { sassJs } from './ProjectFiles/tasks/sassJs';
import { assembleJs } from './ProjectFiles/tasks/assembleJs';
import { copyJs } from './ProjectFiles/tasks/copyJs';
import { createFoldersJs } from './ProjectFiles/tasks/createFolders';

import { mainScss } from './ProjectFiles/styles/mainScss';

import { headerHbs, layoutHbs, pageHbs } from './ProjectFiles/assemble';
const execSync = require('child_process').execSync;
const npm = require('npm-programmatic');

export interface IConfig {
    engine: 'handlebars',
    container: string,
    name: string,
    mainFile: string
}

export class ProjectFiles {
    private projectFolder;
    private engine: iEngine;

    private config: IConfig;

    private outFolder = './dist';
    private assetsFolder = '/assets';

    private assembleDir;

    public constructor(directory: string, config: IConfig) {
        this.config = config;
        this.projectFolder = directory + this.config.name;
        this.assembleDir = this.projectFolder + envSlash() + 'src' + envSlash() + 'views' + envSlash() + 'assemble';
    }

    private loadEngine() {
        switch (this.config.engine) {
            case 'handlebars':
                this.engine = new Handlebars('src/views', 'src/app');
                break;

            default:
                throw Error('Unknown engine type: ' + this.config.engine);
        }
    }

    public get dependencies() {
        return ['fuspa'];
    }

    public get devDependencies() {
        return ['live-server', 'webpack', 'node-sass',
            'assemble', 'gulp-extname', 'chalk', 'ncp',
            'ts-loader', 'typescript',
            'fork-ts-checker-webpack-plugin', 'uglifyjs-webpack-plugin',
            'cache-loader', 'thread-loader', 'mkdirp',
            '@types/node'
        ];
    }

    private createProjectFolders() {
        return createFolder(this.projectFolder) &&
            createFolder(this.projectFolder + envSlash() + 'src') &&
            createFolder(this.projectFolder + envSlash() + 'src' + envSlash() + 'app') &&
            createFolder(this.projectFolder + envSlash() + 'src' + envSlash() + 'styles') &&
            createFolder(this.projectFolder + envSlash() + 'src' + envSlash() + 'views') &&
            createFolder(this.assembleDir) &&
            createFolder(this.assembleDir + envSlash() + 'pages') &&
            createFolder(this.assembleDir + envSlash() + 'layouts') &&
            createFolder(this.assembleDir + envSlash() + 'partials') &&
            createFolder(this.projectFolder + envSlash() + 'tasks') &&
            createFolder(this.projectFolder + envSlash() + 'static') &&
            createFolder(this.projectFolder + envSlash() + 'static' + envSlash() + 'fonts') &&
            createFolder(this.projectFolder + envSlash() + 'static' + envSlash() + 'images');
    }

    private createTaskFiles() {
        // Create each file in tasks
        let files: IFileContent[] = [
            {
                filename: 'webpack.js',
                textContent: webpackJs('./src/app/main.ts', this.outFolder + this.assetsFolder + '/js/bundle.min.js')
            },
            {
                filename: 'liveServer.js',
                textContent: liveServerJs(this.outFolder)
            },
            {
                filename: 'base.js',
                textContent: baseJs()
            },
            {
                filename: 'sass.js',
                textContent: sassJs('./src/styles/main.scss', this.outFolder + this.assetsFolder + '/css/bundle.min.css')
            },
            {
                filename: 'assemblefile.js',
                textContent: assembleJs([{
                    // As the task file resides in the task folder, need to reference one folder "back"
                    task: 'default',
                    layout: 'baseLayout',
                    pages: '../src/views/assemble/pages/*.hbs',
                    layoutPath: '../src/views/assemble/layouts/baseLayout.hbs',
                    partials: '../src/views/assemble/partials/*.hbs'
                }], '.' + this.outFolder)
            },
            {
                filename: 'copy.js',
                textContent: copyJs(
                    { source: './static/images', output: this.outFolder + '/assets/images' },
                    { source: './static/fonts', output: this.outFolder + '/assets/fonts' })
            },
            {
                filename: 'createFolders.js',
                textContent: createFoldersJs([
                    this.outFolder + '/assets/images',
                    this.outFolder + '/assets/fonts',
                    this.outFolder + '/assets/js',
                    this.outFolder + '/assets/css'])
            }
        ];

        return this.writeFiles(this.projectFolder + envSlash() + 'tasks', files);
    }

    private createStyleFiles() {
        let files: IFileContent[] = [
            {
                filename: 'main.scss',
                textContent: mainScss()
            }
        ];

        return this.writeFiles(this.projectFolder + envSlash() + 'src' + envSlash() + 'styles', files);
    }

    private createSrcFiles() {
        let files: IFileContent[] = [
            {
                filename: this.config.mainFile,
                textContent: Main(this.engine.loadTemplates, this.engine.assignEngine, this.config.container)
            }
        ];

        return this.writeFiles(this.projectFolder + envSlash() + 'src' + envSlash() + 'app', files);
    }

    private createProjectFiles() {
        let files: IFileContent[] = [
            {
                filename: 'tsconfig.json',
                textContent: tsconfig('src/app/' + this.config.mainFile)
            }
        ];

        return this.writeFiles(this.projectFolder, files);
    }

    private createAssembleFiles() {
        let files: IFileContent[] = [
            {
                filename: 'partials/header.hbs',
                textContent: headerHbs()
            },
            {
                filename: 'pages/index.hbs',
                textContent: pageHbs()
            },
            {
                filename: 'layouts/baseLayout.hbs',
                textContent: layoutHbs()
            }
        ];
        return this.writeFiles(this.assembleDir, files)
    }

    private createEngineFiles() {
        let folders = this.engine.createFolders();
        let files = this.engine.createPages();

        for (let i = 0; i < folders.length; ++i)
            createFolder(this.projectFolder + envSlash() + folders[i]);

        return this.writeFiles(this.projectFolder, files);
    }

    private createNPMFiles() {

        let scripts = {};
        Object.assign(scripts, this.engine.scripts(), this.npmScripts());


        const npmPackage = {
            name: this.config.name,
            version: '1.0.0',
            description: '',
            main: 'src/app/' + this.config.mainFile,
            scripts: scripts,
            author: '',// who am i
            license: '', // WHAT TO USE?
            dependencies: {},
            devDependencies: {}
        };

        const files: IFileContent[] = [
            {
                filename: 'package.json',
                textContent: JSON.stringify(npmPackage)
            }
        ];

        return this.writeFiles(this.projectFolder, files);
    }

    private async addNpmDependencies() {
        try {

            await npm.install(this.dependencies, {
                cwd: this.projectFolder,
                saveDev: true
            });

            await npm.install(this.engine.dependencies, {
                cwd: this.projectFolder,
                save: true
            });

            await npm.install(this.devDependencies, {
                cwd: this.projectFolder,
                saveDev: true
            });

            this.runScripts();
            return true;
        }
        catch (ex) {
            console.error('Couldn\'t install dependencies', ex);
        }

        return false;
    }

    private writeFiles(folder: string, files: IFileContent[]) {
        for (let i = 0; i < files.length; ++i) {
            const file = folder + envSlash() + files[i].filename;
            console.log("file to write: ", files[i].filename);

            try {
                fs.writeFileSync(file, files[i].textContent);
                console.log('Created file: `' + file + '`');
            }
            catch (exception) {
                console.log('Not able to create file: `' + file + '`');
            }
        }

        return true;
    }

    public npmScripts() {
        return {
            'build:html': './node_modules/.bin/assemble --cwd=tasks',
            'build:webpack': './node_modules/.bin/webpack --config tasks/webpack.js',
            'debug': './node_modules/.bin/webpack --config tasks/webpack.js --watch',
            'build:style': 'node tasks/sass.js',
            'copy': 'node tasks/copy.js',
            'start': 'node tasks/liveServer.js',
            'createfolder': 'node tasks/createFolders.js',
            'init': 'npm run createfolder && npm run build:html && npm run build:style && npm run spa:engine && npm run copy && npm run build:webpack'
        };
    }

    private write() {
        return this.createProjectFolders() &&
            this.createTaskFiles() &&
            this.createStyleFiles() &&
            this.createSrcFiles() &&
            this.createProjectFiles() &&
            this.createAssembleFiles() &&
            this.createEngineFiles() &&
            this.createNPMFiles(); // ./src/views. should probably do something else..
    }

    private runScripts() {
        execSync('cd ' + this.projectFolder + ' && npm run init');
    }

    public async create() {
        this.loadEngine();
        if (this.write() && await this.addNpmDependencies()) {
            console.log('Successfully created project');
        }
        else {
            throw Error('Not able to create project files');
        }
    }
}