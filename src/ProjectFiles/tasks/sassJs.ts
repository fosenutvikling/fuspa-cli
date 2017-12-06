export const sassJs = (source, output) =>

    `
var sass = require('node-sass');
var fs = require('fs');
const base = require('./base');

sass.render({
    file: '${source}',
    includePaths: ['node_modules'],
    outputStyle: 'compressed',
    outFile: '${output}'
}, function (error, result) { // node-style callback from v3.0.0 onwards 
    if (error) {
        base.error('Error creating style file\\n');
        console.log(error.status); // used to be "code" in v2x and below 
        console.log(error.column);
        console.log(error.message);
        console.log(error.line);
        console.log(error);
    } else {
        base.success('Style file successfully compiled\\n');
        base.info('Number of files: ');
        base.print(result.stats.includedFiles.length + '\\n');
        base.info('Compiled in: ');
        base.print(result.stats.duration + 'ms');

        fs.writeFile('${output}', result.css.toString(), function (err) {
            if (!err) {
                base.success('Output file created');
            }
        });
    }
});

`