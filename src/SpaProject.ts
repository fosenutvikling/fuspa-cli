import { ProjectFiles, IConfig } from './ProjectFiles';
import { envSlash } from './Functions';
require('source-map-support').install();

export class SpaProject {
    private projectFiles: ProjectFiles;
    private config: IConfig;

    constructor(config: IConfig) {
        this.config = config;
        this.verifyConfig();
        this.projectFiles = new ProjectFiles(process.cwd() + envSlash(), this.config);
    }

    public create() {
        this.projectFiles.create();
    }

    private verifyConfig() {
        if (SpaProject.ContainsSlash(this.config.name))
            throw Error('Name cannot contain a `/` character');
        if (SpaProject.ContainsSlash(this.config.mainFile))
            throw Error('Mainfile cannot contain a `/` character');
        if (!this.config.container.match(/^[A-Za-z]+$/))
            throw Error('Container can only consist of characters [a-z]' + this.config.container.search(/[^a-zA-Z]+/));
    }

    static ContainsSlash(str: string) {
        return str.indexOf('/') >= 0;
    }
}