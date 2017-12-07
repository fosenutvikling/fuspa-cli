import { iEngine } from '../iEngine';
import { Helpers } from './Helpers';
import { envSlash } from '../../Functions';
import { homeIndexPage, headerPartial, greetingPage } from './PagesHbs';

export class Handlebars implements iEngine {
    private handlebarsBin = './node_modules/.bin/handlebars ';
    private templateFolder = 'templates';
    private partialFolder = 'partials';

    public sourceFolder;
    public outputFolder;

    // Do not contain and foreward or backward slashes, as npm scripts may 
    // contain foreward slashes, eventhough if the os do not support it
    private templateOutput = 'templates.js';
    private partialOutput = 'partials.js';

    public readonly dependencies = ['handlebars', 'moment'];

    public readonly loadTemplates = `
const Handlebars = require('handlebars/runtime');
require('./templates.js');
require('./partials.js');
require('./hbsHelpers.ts')(Handlebars);`;

    public readonly assignEngine = 'Handlebars.templates';

    public readonly scripts = () => {
        return {
            'spa:engine:templates':
                this.handlebarsBin + ' ' +
                './' + this.sourceFolder +
                '/' + this.templateFolder +
                ' --extension hbs --output ' +
                this.outputFolder + '/' +
                this.templateOutput +
                ' --commonjs handlebars/runtime --min',

            'spa:engine:partials':
                this.handlebarsBin + ' ' +
                './' + this.sourceFolder +
                '/' + this.partialFolder +
                ' --extension hbs --output ' +
                this.outputFolder + '/' +
                this.partialOutput +
                ' --commonjs handlebars/runtime --map -p',

            'spa:engine': 'npm run spa:engine:templates && npm run spa:engine:partials'
        };
    };

    public createPages = () => [
        {
            filename: this.outputFolder + '/hbsHelpers.ts',
            textContent: Helpers
        },
        {
            filename: this.sourceFolder + envSlash() + this.templateFolder + envSlash() + 'home' + envSlash() + 'index.hbs',
            textContent: homeIndexPage
        },
        {
            filename: this.sourceFolder + envSlash() + this.templateFolder + envSlash() + 'greeting.hbs',
            textContent: greetingPage
        },
        {
            filename: this.sourceFolder + envSlash() + this.partialFolder + envSlash() + 'header.hbs',
            textContent: headerPartial
        }
    ];

    public createFolders = () => [
        this.sourceFolder + envSlash() + this.templateFolder,
        this.sourceFolder + envSlash() + this.templateFolder + envSlash() + 'home',
        this.sourceFolder + envSlash() + this.partialFolder
    ];

    public constructor(sourceFolder, outputFolder) {
        this.sourceFolder = sourceFolder;
        this.outputFolder = outputFolder;
    }
}
