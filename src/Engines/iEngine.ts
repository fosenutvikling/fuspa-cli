import { IFileContent } from '../Functions';
export interface iEngine {
    // Folder for which source files for engine should reside
    sourceFolder: string;

    // Folder to output files generated by engine
    outputFolder: string;

    // Dependencies required by template-engine. Install all dependencies with `npm install`
    readonly dependencies: string[];

    // Text of code to load the templates
    readonly loadTemplates: string;

    // Text of code to assign to Route.options.templateEngine
    readonly assignEngine: string;

    /*
     * Build scripts to add to package.json, where name (key) 
     * is the name of the script, and the value is the actual script
     */
    readonly scripts?: () => { [name: string]: string };

    // Optional files to create which can be used by engine
    createPages?: () => IFileContent[];

    // Folders to create before creating files
    createFolders?: () => string[];
}
