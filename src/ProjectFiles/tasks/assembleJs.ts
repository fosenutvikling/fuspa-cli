export interface AssembleOptions {
    partials: string,
    layout: string,
    pages: string,
    task: string,
    layoutPath: string
};

const createTask = (option: AssembleOptions, destination) =>
    `
app.task('${option.task}', () => {
    app.engine('hbs', require('engine-handlebars'));
    app.option('engine', 'hbs');

    app.partials('${option.partials}');
    app.layout('${option.layoutPath}');

    app.option('layout', '${option.layout}');

    app.src('${option.pages}', {
        layout: '${option.layout}'
    })
        .pipe(extname())
        .pipe(app.renderFile('.hbs'))
        .pipe(app.dest('${destination}'));
});
`

export const assembleJs = (options: AssembleOptions[], destination) => {
    let output = `
    "use strict";
    var assemble = require('assemble');
    var extname = require('gulp-extname');
    var app = assemble();
    
    `;

    for (let i = 0; i < options.length; ++i)
        output += createTask(options[i], destination);

    output += ' module.exports = app;'

    return output;
}